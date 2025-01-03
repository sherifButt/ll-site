'use client'

import React, { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

// Initialize Mermaid with default configuration
try {
  mermaid.initialize({
    startOnLoad: false,
    theme: 'default',
    securityLevel: 'loose',
    htmlLabels: true,
    fontFamily: 'inherit',
    flowchart: {
      curve: 'basis'
    },
    sequence: {
      diagramMarginX: 50,
      diagramMarginY: 10,
      actorMargin: 50,
      width: 150,
      height: 65,
      boxMargin: 10,
      boxTextMargin: 5,
      noteMargin: 10,
      messageMargin: 35,
      mirrorActors: true,
      bottomMarginAdj: 1,
      useMaxWidth: true
    },
    gantt: {
      titleTopMargin: 25,
      barHeight: 20,
      barGap: 4,
      topPadding: 50,
      leftPadding: 75,
      gridLineStartPadding: 35,
      fontSize: 11,
      fontFamily: 'inherit',
      numberSectionStyles: 4,
      axisFormat: '%Y-%m-%d'
    }
  });
  console.log('Mermaid initialized successfully');
} catch (error) {
  console.error('Mermaid initialization error:', error);
}

export default function Mermaid({ chart }) {
  const mermaidRef = useRef()
  const graphId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`)

  useEffect(() => {
    const renderDiagram = async () => {
      if (mermaidRef.current) {
        mermaidRef.current.innerHTML = '' // Clear previous render

        try {
          // Debug: Log the incoming chart data
          console.log('Raw chart data:', chart)
          console.log('Chart type:', typeof chart)

          // Convert chart to string and clean up formatting
          let chartContent = '';
          if (typeof chart === 'string') {
            chartContent = chart.trim();
          } else if (Array.isArray(chart)) {
            chartContent = chart
              .map(item => {
                if (typeof item === 'object') {
                  return item.value || item.toString();
                }
                return item;
              })
              .join('\n')
              .trim();
          } else if (typeof chart === 'object') {
            chartContent = chart.value || chart.toString();
          } else {
            chartContent = String(chart);
          }

          // Remove any leading/trailing whitespace and ensure proper line breaks
          chartContent = chartContent
            .split('\n')
            .map(line => line.trim())
            .join('\n')
            .trim();

          console.log('Cleaned chart content:', chartContent);

          // Debug: Log the processed content
          console.log('Processed chart content:', chartContent)

          // Validate content starts with a valid Mermaid diagram type
          const validDiagramTypes = [
            'mindmap', 'flowchart', 'sequenceDiagram', 
            'classDiagram', 'stateDiagram', 'gantt',
            'pie', 'erDiagram', 'journey'
          ];
          
          const firstLine = chartContent.trim().split('\n')[0];
          const isValid = validDiagramTypes.some(type => 
            firstLine.toLowerCase().startsWith(type)
          );
          
          if (!isValid) {
            console.error('Invalid chart content:', chartContent);
            throw new Error(`Invalid diagram format. Must start with one of: ${validDiagramTypes.join(', ')}`);
          }

          // Render the diagram
          try {
            const { svg } = await mermaid.render(graphId.current, chartContent);
            mermaidRef.current.innerHTML = svg;
            console.log('Mermaid diagram rendered successfully');
          } catch (renderError) {
            console.error('Mermaid render error:', renderError);
            throw new Error(`Failed to render diagram: ${renderError.message}`);
          }
        } catch (error) {
          console.error('Mermaid rendering error:', error)
          mermaidRef.current.innerHTML = `
            <div class="p-4 text-red-500 border border-red-300 rounded">
              <p>Error rendering diagram: ${error.message}</p>
              <pre class="mt-2 text-sm">${
                chart ? JSON.stringify(chart, null, 2) : 'No chart data'
              }</pre>
            </div>
          `
        }
      }
    }

    renderDiagram()
  }, [chart])

  return (
    <div className="my-8 flex justify-center overflow-x-auto">
      <div ref={mermaidRef} className="min-w-0" />
    </div>
  )
}
