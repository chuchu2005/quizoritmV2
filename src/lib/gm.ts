import { GoogleGenerativeAI } from '@google/generative-ai';
import jsonBigInt from 'json-bigint';

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error('GEMINI_API_KEY is not defined in the environment variables');
}

const genAI = new GoogleGenerativeAI(apiKey);

interface OutputFormat {
  [key: string]: string | string[] | OutputFormat;
}

// Function to sanitize JSON string
function sanitizeJsonString(jsonString: string): string {
  return jsonString
    .replace(/\\'/g, "'")        // Replace escaped single quotes
    .replace(/\\"/g, '"')        // Replace escaped double quotes
    .replace(/`/g, '')           // Remove backticks
    .replace(/(\w)"(\w)/g, '$1\'$2') // Replace " between words with '
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove non-printable characters
}

// Function to split concatenated JSON objects
function splitJsonObjects(jsonString: string): string[] {
  const jsonObjects: string[] = [];
  let braceCount = 0;
  let startIndex = 0;

  for (let i = 0; i < jsonString.length; i++) {
    if (jsonString[i] === '{') {
      if (braceCount === 0) {
        startIndex = i;
      }
      braceCount++;
    } else if (jsonString[i] === '}') {
      braceCount--;
      if (braceCount === 0) {
        jsonObjects.push(jsonString.slice(startIndex, i + 1));
      }
    }
  }
  return jsonObjects;
}

export async function strict_output(
  system_prompt: string,
  user_prompt: string | string[],
  output_format: OutputFormat,
  default_category: string = "",
  output_value_only: boolean = false,
  model: string = "gemini-1.5-flash",
  temperature: number = 0.7,
  num_tries: number = 3,
  verbose: boolean = false
): Promise<{ question: string; answer: string }[]> {

  const list_input: boolean = Array.isArray(user_prompt);
  const dynamic_elements: boolean = /<.*?>/.test(JSON.stringify(output_format));
  const list_output: boolean = /\[.*?\]/.test(JSON.stringify(output_format));

  let error_msg: string = "";

  const generationConfig = {
    stopSequences: ["red"],
    maxOutputTokens: 500,
    temperature: temperature,
    topP: 0.6,
    topK: 16,
  };

  const modelInstance = genAI.getGenerativeModel({ model, generationConfig });

  for (let i = 0; i < num_tries; i++) {
    let output_format_prompt: string = `\nYou are to output the following in JSON format: ${JSON.stringify(output_format)}. \nDo not put quotation marks or escape character \\ in the output fields.`;

    if (list_output) {
      output_format_prompt += `\nIf the output field is a list, classify output into the best element of the list.`;
    }

    if (dynamic_elements) {
      output_format_prompt += `\nAny text enclosed by < and > indicates you must generate content to replace it. Example input: Go to <location>, Example output: Go to the garden\nAny output key containing < and > indicates you must generate the key name to replace it. Example input: {'<location>': 'description of location'}, Example output: {school: a place for education}`;
    }

    if (list_input) {
      output_format_prompt += `\nGenerate a list of JSON, one JSON for each input element.`;
    }

    const full_prompt = system_prompt + output_format_prompt + error_msg + "the topic you should give output for it is : " + user_prompt;

    let response;
    try {
      response = await modelInstance.generateContent(full_prompt);
    } catch (e) {
      console.error("Error generating content:", e);
      continue;
    }

    let res: string = response.response.text() ?? "";

    // Sanitize JSON string
    res = sanitizeJsonString(res);

    if (verbose) {
      console.log("System prompt:", full_prompt);
      console.log("\nUser prompt:", user_prompt);
      console.log("\nGemini response:", res);
    }

    try {
      const jsonStrings = splitJsonObjects(res);
      let output: any[] = [];

      jsonStrings.forEach((jsonString) => {
        try {
          output.push(jsonBigInt.parse(jsonString));
        } catch (e) {
          console.error('Error parsing JSON response:', e);
          throw e;
        }
      });

      if (list_input) {
        if (!Array.isArray(output)) {
          throw new Error("Output format not in a list of JSON");
        }
      } else {
        output = [output];
      }

      for (let index = 0; index < output.length; index++) {
        for (const key in output_format) {
          if (/<.*?>/.test(key)) continue;

          if (!(key in output[index])) {
            throw new Error(`${key} not in JSON output`);
          }

          if (Array.isArray(output_format[key])) {
            const choices = output_format[key] as string[];
            if (Array.isArray(output[index][key])) {
              output[index][key] = output[index][key][0];
            }
            if (!choices.includes(output[index][key]) && default_category) {
              output[index][key] = default_category;
            }
            if (output[index][key].includes(":")) {
              output[index][key] = output[index][key].split(":")[0];
            }
          }
        }

        if (output_value_only) {
          output[index] = Object.values(output[index]);
          if (output[index].length === 1) {
            output[index] = output[index][0];
          }
        }
      }

      return list_input ? output : output[0];
    } catch (e) {
      error_msg = `\n\nResult: ${res}\n\nError message: ${e}`;
      console.log("An exception occurred:", e);
      console.log("Current invalid JSON format:", res);
    }
  }

  return [];
}
