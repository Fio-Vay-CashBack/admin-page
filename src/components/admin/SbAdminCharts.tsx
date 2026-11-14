"use client";

import React, { useState } from "react";

const AREA_DATA = [
  { label: "Mar 1", value: 10000, showTick: true },
  { label: "Mar 2", value: 30162, showTick: false },
  { label: "Mar 3", value: 26263, showTick: true },
  { label: "Mar 4", value: 18394, showTick: false },
  { label: "Mar 5", value: 18287, showTick: true },
  { label: "Mar 6", value: 28682, showTick: false },
  { label: "Mar 7", value: 31274, showTick: true },
  { label: "Mar 8", value: 33259, showTick: false },
  { label: "Mar 9", value: 25849, showTick: true },
  { label: "Mar 10", value: 24159, showTick: false },
  { label: "Mar 11", value: 32651, showTick: true },
  { label: "Mar 12", value: 31984, showTick: false },
  { label: "Mar 13", value: 38451, showTick: true },
];

const BAR_DATA = [
  { label: "January", value: 4215 },
  { label: "February", value: 5312 },
  { label: "March", value: 6251 },
  { label: "April", value: 7841 },
  { label: "May", value: 9821 },
  { label: "June", value: 14984 },
];

function getSmoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let path = `M ${points[0].x} ${points[0].y}`;
  const tension = 0.35;

  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) * tension;
    const cp1y = p1.y + (p2.y - p0.y) * tension;
    const cp2x = p2.x - (p3.x - p1.x) * tension;
    const cp2y = p2.y - (p3.y - p1.y) * tension;

    path += ` C ${cp1x.toFixed(1)} ${cp1y.toFixed(1)}, ${cp2x.toFixed(
      1
    )} ${cp2y.toFixed(1)}, ${p2.x.toFixed(1)} ${p2.y.toFixed(1)}`;
  }

  return path;
}

export function AreaChartCard({ footerText }: { footerText?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartLeft = 56;
  const chartRight = 565;
  const chartTop = 20;
  const chartBottom = 205;
  const width = chartRight - chartLeft;
  const height = chartBottom - chartTop;
  const maxVal = 40000;

  const points = AREA_DATA.map((d, i) => ({
    x: chartLeft + (i / (AREA_DATA.length - 1)) * width,
    y: chartBottom - (d.value / maxVal) * height,
    ...d,
  }));

  const linePath = getSmoothPath(points);
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartBottom} L ${points[0].x} ${chartBottom} Z`;

  const yTicks = [40000, 30000, 20000, 10000, 0];

  return (
    <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center gap-2 text-[14.5px] text-[#212529]">
        <svg
          className="w-4 h-4 text-[#212529]"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M64 64c0-17.7-14.3-32-32-32S0 46.3 0 64V400c0 44.2 35.8 80 80 80H480c17.7 0 32-14.3 32-32s-14.3-32-32-32H80c-8.8 0-16-7.2-16-16V64zm96 288H448c17.7 0 32-14.3 32-32V251.8c0-7.6-2.7-15-7.7-20.8l-65.8-76.8c-12.1-14.2-33.7-15-46.9-1.8l-21 21c-10 10-26.4 9.2-35.4-1.6l-39.2-47c-12.6-15.1-35.7-15.4-48.7-.6L135.9 215c-5.1 5.8-7.9 13.3-7.9 21.1v84c0 17.7 14.3 32 32 32z" />
        </svg>
        <span>Area Chart Example</span>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="relative w-full">
          <svg
            viewBox="0 0 585 245"
            className="w-full h-auto overflow-visible select-none"
          >
            {/* Horizontal Grid Lines & Y-Axis Labels */}
            {yTicks.map((tick) => {
              const y = chartBottom - (tick / maxVal) * height;
              return (
                <g key={tick}>
                  <line
                    x1={chartLeft}
                    y1={y}
                    x2={chartRight}
                    y2={y}
                    stroke={tick === 0 ? "#ced4da" : "#eceeef"}
                    strokeWidth="1"
                  />
                  <line
                    x1={chartLeft - 5}
                    y1={y}
                    x2={chartLeft}
                    y2={y}
                    stroke="#ced4da"
                    strokeWidth="1"
                  />
                  <text
                    x={chartLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#495057"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Vertical Left Axis */}
            <line
              x1={chartLeft}
              y1={chartTop}
              x2={chartLeft}
              y2={chartBottom}
              stroke="#ced4da"
              strokeWidth="1"
            />

            {/* Vertical faint dotted gridlines */}
            {points.map((pt, idx) =>
              pt.showTick ? (
                <line
                  key={`vgrid-${idx}`}
                  x1={pt.x}
                  y1={chartTop}
                  x2={pt.x}
                  y2={chartBottom}
                  stroke="#f1f3f5"
                  strokeWidth="1"
                  strokeDasharray="2,2"
                />
              ) : null
            )}

            {/* Shaded Area */}
            <path d={areaPath} fill="rgba(2, 117, 216, 0.2)" />

            {/* Smooth Line */}
            <path
              d={linePath}
              fill="none"
              stroke="#0275d8"
              strokeWidth="2.5"
            />

            {/* Data Points */}
            {points.map((pt, idx) => (
              <g
                key={pt.label}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="cursor-pointer"
              >
                <circle
                  cx={pt.x}
                  cy={pt.y}
                  r={hoveredIdx === idx ? 6 : 4.5}
                  fill="#0275d8"
                  stroke="#ffffff"
                  strokeWidth="1.5"
                />
              </g>
            ))}

            {/* X-Axis Labels */}
            {points.map((pt) =>
              pt.showTick ? (
                <g key={`xlabel-${pt.label}`}>
                  <text
                    x={pt.x}
                    y={chartBottom + 16}
                    textAnchor="end"
                    fontSize="11"
                    fill="#212529"
                    transform={`rotate(-24, ${pt.x}, ${chartBottom + 16})`}
                  >
                    {pt.label}
                  </text>
                </g>
              ) : null
            )}

            {/* Hover Tooltip */}
            {hoveredIdx !== null && (
              <g
                transform={`translate(${Math.min(
                  Math.max(points[hoveredIdx].x - 45, 58),
                  485
                )}, ${Math.max(points[hoveredIdx].y - 42, 6)})`}
              >
                <rect
                  width="92"
                  height="32"
                  rx="4"
                  fill="rgba(33, 37, 41, 0.9)"
                />
                <text
                  x="46"
                  y="14"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {points[hoveredIdx].label}
                </text>
                <text
                  x="46"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                >
                  Sessions: {points[hoveredIdx].value.toLocaleString()}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {footerText && (
        <div className="bg-[#f7f7f7] border-t border-black/12 px-4 py-2 text-[12.5px] text-[#6c757d]">
          {footerText}
        </div>
      )}
    </div>
  );
}

export function BarChartCard({ footerText }: { footerText?: string }) {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const chartLeft = 52;
  const chartRight = 565;
  const chartTop = 20;
  const chartBottom = 205;
  const width = chartRight - chartLeft;
  const height = chartBottom - chartTop;
  const maxVal = 15000;

  const yTicks = [15000, 10000, 5000, 0];
  const slotWidth = width / BAR_DATA.length;
  const barWidth = slotWidth * 0.62;

  return (
    <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center gap-2 text-[14.5px] text-[#212529]">
        <svg
          className="w-4 h-4 text-[#212529]"
          fill="currentColor"
          viewBox="0 0 512 512"
        >
          <path d="M32 32c17.7 0 32 14.3 32 32V400c0 8.8 7.2 16 16 16H480c17.7 0 32 14.3 32 32s-14.3 32-32 32H80c-44.2 0-80-35.8-80-80V64C0 46.3 14.3 32 32 32zM160 224c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V256c0-17.7 14.3-32 32-32zm128-64V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm64 32c17.7 0 32 14.3 32 32v96c0 17.7-14.3 32-32 32s-32-14.3-32-32V224c0-17.7 14.3-32 32-32zM480 96V320c0 17.7-14.3 32-32 32s-32-14.3-32-32V96c0-17.7 14.3-32 32-32s32 14.3 32 32z" />
        </svg>
        <span>Bar Chart Example</span>
      </div>

      {/* Body */}
      <div className="p-4">
        <div className="relative w-full">
          <svg
            viewBox="0 0 585 245"
            className="w-full h-auto overflow-visible select-none"
          >
            {/* Horizontal Grid Lines & Y-Axis Labels */}
            {yTicks.map((tick) => {
              const y = chartBottom - (tick / maxVal) * height;
              return (
                <g key={tick}>
                  <line
                    x1={chartLeft}
                    y1={y}
                    x2={chartRight}
                    y2={y}
                    stroke={tick === 0 ? "#ced4da" : "#eceeef"}
                    strokeWidth="1"
                  />
                  <line
                    x1={chartLeft - 5}
                    y1={y}
                    x2={chartLeft}
                    y2={y}
                    stroke="#ced4da"
                    strokeWidth="1"
                  />
                  <text
                    x={chartLeft - 8}
                    y={y + 4}
                    textAnchor="end"
                    fontSize="11"
                    fill="#495057"
                  >
                    {tick}
                  </text>
                </g>
              );
            })}

            {/* Vertical Left Axis */}
            <line
              x1={chartLeft}
              y1={chartTop}
              x2={chartLeft}
              y2={chartBottom}
              stroke="#ced4da"
              strokeWidth="1"
            />

            {/* Bars */}
            {BAR_DATA.map((item, idx) => {
              const barHeight = (item.value / maxVal) * height;
              const x =
                chartLeft + idx * slotWidth + (slotWidth - barWidth) / 2;
              const y = chartBottom - barHeight;
              const centerX = x + barWidth / 2;

              return (
                <g
                  key={item.label}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="cursor-pointer"
                >
                  <rect
                    x={x}
                    y={y}
                    width={barWidth}
                    height={barHeight}
                    fill={hoveredIdx === idx ? "#0b5ed7" : "#0275d8"}
                  />
                  <text
                    x={centerX}
                    y={chartBottom + 18}
                    textAnchor="middle"
                    fontSize="11"
                    fill="#212529"
                  >
                    {item.label}
                  </text>
                </g>
              );
            })}

            {/* Hover Tooltip */}
            {hoveredIdx !== null && (
              <g
                transform={`translate(${Math.min(
                  Math.max(
                    chartLeft +
                      hoveredIdx * slotWidth +
                      slotWidth / 2 -
                      48,
                    55
                  ),
                  480
                )}, ${Math.max(
                  chartBottom -
                    (BAR_DATA[hoveredIdx].value / maxVal) * height -
                    38,
                  6
                )})`}
              >
                <rect
                  width="96"
                  height="32"
                  rx="4"
                  fill="rgba(33, 37, 41, 0.9)"
                />
                <text
                  x="48"
                  y="14"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                >
                  {BAR_DATA[hoveredIdx].label}
                </text>
                <text
                  x="48"
                  y="26"
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                >
                  Revenue: ${BAR_DATA[hoveredIdx].value.toLocaleString()}
                </text>
              </g>
            )}
          </svg>
        </div>
      </div>

      {footerText && (
        <div className="bg-[#f7f7f7] border-t border-black/12 px-4 py-2 text-[12.5px] text-[#6c757d]">
          {footerText}
        </div>
      )}
    </div>
  );
}

export function PieChartCard({ footerText }: { footerText?: string }) {
  return (
    <div className="border border-black/15 rounded-[4px] bg-white overflow-hidden">
      <div className="bg-[#f7f7f7] border-b border-black/12 px-4 py-2.5 flex items-center gap-2 text-[14.5px] text-[#212529]">
        <svg
          className="w-4 h-4 text-[#212529]"
          fill="currentColor"
          viewBox="0 0 576 512"
        >
          <path d="M304 240V16.6c0-9 7-16.6 16-16.6C443.7 0 544 100.3 544 224c0 9-7.6 16-16.6 16H304zM32 272C32 150.7 122.1 50.3 239 34.3c9.2-1.3 17 6.1 17 15.4V288L412.5 444.5c6.7 6.7 6.2 17.7-1.5 23.1C371.8 495.6 323.8 512 272 512C139.5 512 32 404.6 32 272zm526.4 16c9.3 0 16.6 7.8 15.4 17c-7.7 55.9-34.6 105.6-73.9 142.3c-6 5.6-15.4 5.2-21.2-.7L320 288H558.4z" />
        </svg>
        <span>Pie Chart Example</span>
      </div>
      <div className="p-6 flex flex-col items-center">
        <svg viewBox="0 0 220 220" className="w-52 h-52">
          {/* Blue slice: 35% */}
          <circle
            r="55"
            cx="110"
            cy="110"
            fill="transparent"
            stroke="#007bff"
            strokeWidth="110"
            strokeDasharray="121 345.6"
            transform="rotate(-90 110 110)"
          />
          {/* Red slice: 28% */}
          <circle
            r="55"
            cx="110"
            cy="110"
            fill="transparent"
            stroke="#dc3545"
            strokeWidth="110"
            strokeDasharray="96.8 345.6"
            strokeDashoffset="-121"
            transform="rotate(-90 110 110)"
          />
          {/* Yellow slice: 22% */}
          <circle
            r="55"
            cx="110"
            cy="110"
            fill="transparent"
            stroke="#ffc107"
            strokeWidth="110"
            strokeDasharray="76 345.6"
            strokeDashoffset="-217.8"
            transform="rotate(-90 110 110)"
          />
          {/* Green slice: 15% */}
          <circle
            r="55"
            cx="110"
            cy="110"
            fill="transparent"
            stroke="#28a745"
            strokeWidth="110"
            strokeDasharray="51.8 345.6"
            strokeDashoffset="-293.8"
            transform="rotate(-90 110 110)"
          />
        </svg>
        <div className="flex flex-wrap items-center justify-center gap-4 mt-4 text-[13px] text-[#212529]">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#007bff]" /> Blue (35%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#dc3545]" /> Red (28%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#ffc107]" /> Yellow (22%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#28a745]" /> Green (15%)
          </span>
        </div>
      </div>
      {footerText && (
        <div className="bg-[#f7f7f7] border-t border-black/12 px-4 py-2 text-[12.5px] text-[#6c757d]">
          {footerText}
        </div>
      )}
    </div>
  );
}

