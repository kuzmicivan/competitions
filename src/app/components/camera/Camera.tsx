import React, { forwardRef, useCallback, useRef, useState } from "react";
import Webcam from "react-webcam";

interface CameraProps {
  onCapture: () => void;
  onClose: () => void;
}

export type Ref = Webcam;

const Camera = forwardRef<Ref, CameraProps>((props, ref) => {
  return (
    <div className="relative">
      <div className="flex justify-center">
        <Webcam
          audio={false}
          height={360}
          ref={ref}
          screenshotFormat="image/jpeg"
          width={720}
        />
      </div>

      <div className="absolute bottom-3 left-80 pl-6 flex justify-center gap-2">
        <button
          className="cursor-pointer h-10 w-10 bg-slate-200 hover:bg-white border-4 border-blue-500 rounded-full"
          onClick={props.onCapture}
        />
        <button onClick={props.onClose}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            className="w-6 h-6 cursor-pointer stroke-slate-200 hover:stroke-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

Camera.displayName = 'Camera';

export default Camera;
