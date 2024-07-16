"use client";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useCallback } from "react";
import WordCloud from "wordcloud";

type Props = {
  formattedTopics: { text: string; value: number }[];
};

const CustomWordCloud = ({ formattedTopics }: Props) => {
  
  const theme = useTheme();

  if(theme.theme == "system") {
    theme.theme = theme.systemTheme;
  }

  const router = useRouter();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderWordCloud = useCallback(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        WordCloud(canvas, {
          list: formattedTopics.map((topic) => [topic.text, topic.value]),
          gridSize: Math.round(20 * canvas.width / 1024),
          weightFactor: (size) => Math.log2(size) * 5 * (canvas.width / 1024) + 20,
          fontFamily: "Times",
          color: () => (theme.theme === "dark" ? "white" : "black"),
          rotateRatio: 0, // No rotation
          backgroundColor: theme.theme === "dark" ? "#020817" : "#fff",
          click: (item) => {
            router.push("/quiz?topic=" + item[0]);
          },
        });
      }
    }
  }, [formattedTopics, theme, router]);

  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const parentElement = canvasRef.current.parentElement;
        if (parentElement) {
          canvasRef.current.width = parentElement.clientWidth/1.3;
          canvasRef.current.height = parentElement.clientHeight/1.1; // Adjust height as needed or make it responsive too
          renderWordCloud();
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial render

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [renderWordCloud]);

  useEffect(() => {
    renderWordCloud();
  }, [formattedTopics, theme, renderWordCloud]);

  return <canvas ref={canvasRef} />;
};

export default CustomWordCloud;
