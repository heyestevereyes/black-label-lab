"use client";

import { useState, useEffect, useCallback } from "react";

type Expression =
  | "neutral"
  | "happy"
  | "sad"
  | "surprised"
  | "angry"
  | "wink"
  | "sleepy"
  | "excited";

const EXPRESSIONS: Expression[] = [
  "neutral", "happy", "sad", "surprised", "angry", "wink", "sleepy", "excited",
];

// Eye centers in a 32x32 viewBox. Head rect is (1,1)→(31,31).
const LX = 10;  // left eye x
const RX = 22;  // right eye x
const EY = 14;  // eye y (upper third of head)

function Eye({
  cx,
  expr,
  isLeft,
  blink,
}: {
  cx: number;
  expr: Expression;
  isLeft: boolean;
  blink: boolean;
}) {
  // Blink or wink-left → horizontal line
  if (blink || (expr === "wink" && isLeft)) {
    return (
      <rect
        x={cx - 3.5}
        y={EY - 0.75}
        width={7}
        height={1.5}
        rx={0.75}
        fill="white"
      />
    );
  }

  switch (expr) {
    case "neutral":
      return <circle cx={cx} cy={EY} r={3} fill="white" />;

    case "happy":
      // Upward arc — squinting smile eyes
      return (
        <path
          d={`M ${cx - 3.5} ${EY + 1.5} Q ${cx} ${EY - 3} ${cx + 3.5} ${EY + 1.5}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case "sad":
      // Downward arc
      return (
        <path
          d={`M ${cx - 3.5} ${EY - 1.5} Q ${cx} ${EY + 3} ${cx + 3.5} ${EY - 1.5}`}
          stroke="white"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
      );

    case "surprised":
      // Wide-open circles
      return <circle cx={cx} cy={EY} r={4.5} fill="white" />;

    case "angry": {
      // Circle + inner-slanting brow above it
      const brow =
        isLeft ? (
          <line
            x1={cx - 4} y1={EY - 5.5}
            x2={cx + 3} y2={EY - 2.5}
            stroke="white" strokeWidth="1.5" strokeLinecap="round"
          />
        ) : (
          <line
            x1={cx - 3} y1={EY - 2.5}
            x2={cx + 4} y2={EY - 5.5}
            stroke="white" strokeWidth="1.5" strokeLinecap="round"
          />
        );
      return (
        <g>
          <circle cx={cx} cy={EY} r={3} fill="white" />
          {brow}
        </g>
      );
    }

    case "wink":
      // isLeft is already handled above; right eye stays normal
      return <circle cx={cx} cy={EY} r={3} fill="white" />;

    case "sleepy":
      // Half-lidded: circle with a clipping rect over the top half
      return (
        <g>
          <circle cx={cx} cy={EY} r={3} fill="white" />
          {/* black eyelid covering top 55% */}
          <rect x={cx - 4} y={EY - 4} width={8} height={3.5} fill="#111111" />
        </g>
      );

    case "excited":
      // 4-pointed sparkle / star
      return (
        <polygon
          points={[
            `${cx},${EY - 4}`,
            `${cx + 1},${EY - 1}`,
            `${cx + 4},${EY}`,
            `${cx + 1},${EY + 1}`,
            `${cx},${EY + 4}`,
            `${cx - 1},${EY + 1}`,
            `${cx - 4},${EY}`,
            `${cx - 1},${EY - 1}`,
          ].join(" ")}
          fill="white"
        />
      );

    default:
      return <circle cx={cx} cy={EY} r={3} fill="white" />;
  }
}

interface PixelMascotProps {
  size?: number;
  className?: string;
}

export default function PixelMascot({ size = 32, className = "" }: PixelMascotProps) {
  const [expr, setExpr] = useState<Expression>("neutral");
  const [blink, setBlink] = useState(false);

  const doBlink = useCallback(() => {
    setBlink(true);
    setTimeout(() => setBlink(false), 120);
  }, []);

  // Random blink every 2–6 s
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>;
    const schedule = () => {
      t = setTimeout(() => {
        doBlink();
        schedule();
      }, 2000 + Math.random() * 4000);
    };
    schedule();
    return () => clearTimeout(t);
  }, [doBlink]);

  // Random expression change every 5–11 s, holds 2–3 s then resets to neutral
  useEffect(() => {
    let idle: ReturnType<typeof setTimeout>;
    let reset: ReturnType<typeof setTimeout>;
    const schedule = () => {
      idle = setTimeout(() => {
        const next = EXPRESSIONS[Math.floor(Math.random() * EXPRESSIONS.length)];
        setExpr(next);
        reset = setTimeout(
          () => setExpr("neutral"),
          2000 + Math.random() * 1000,
        );
        schedule();
      }, 5000 + Math.random() * 6000);
    };
    schedule();
    return () => {
      clearTimeout(idle);
      clearTimeout(reset);
    };
  }, []);

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="NBDY mascot"
    >
      {/* Head */}
      <rect x="1" y="1" width="30" height="30" rx="4" fill="#111111" />
      <rect x="1" y="1" width="30" height="30" rx="4" stroke="#FF4C02" strokeWidth="1.5" />
      {/* Eyes */}
      <Eye cx={LX} expr={expr} isLeft={true}  blink={blink} />
      <Eye cx={RX} expr={expr} isLeft={false} blink={blink} />
    </svg>
  );
}