import { SVGProps } from 'react';

type IconProps = SVGProps<SVGSVGElement>;

export function LaptopCodeIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="12"
        rx="2.5"
        className="fill-[#FBE8EE] dark:fill-[#332029]"
      />
      <path d="M9.5 8.5 7.5 10l2 1.5" />
      <path d="m14.5 8.5 2 1.5-2 1.5" />
      <path d="m12.75 8-1.5 4" stroke="#3D4E81" className="dark:stroke-[#8FA4E8]" />
      <path d="M2 18.5h20" />
      <path d="M9 16v2.5h6V16" />
    </svg>
  );
}

export function ServerStackIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3.5"
        y="4"
        width="17"
        height="6.5"
        rx="2"
        className="fill-[#E9EEF9] dark:fill-[#22293F]"
      />
      <rect
        x="3.5"
        y="13.5"
        width="17"
        height="6.5"
        rx="2"
        className="fill-[#FBE8EE] dark:fill-[#332029]"
      />
      <circle cx="7" cy="7.25" r="0.9" fill="#3D4E81" stroke="none" className="dark:fill-[#8FA4E8]" />
      <circle cx="7" cy="16.75" r="0.9" fill="#BE4B72" stroke="none" className="dark:fill-[#F2A7C0]" />
      <path d="M11 7.25h6" />
      <path d="M11 16.75h6" />
    </svg>
  );
}

export function DatabaseSchemaIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <ellipse
        cx="12"
        cy="6"
        rx="7.5"
        ry="3"
        className="fill-[#F1E6FA] dark:fill-[#2D2036]"
      />
      <path d="M4.5 6v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3V6" />
      <path d="M4.5 12v6c0 1.66 3.36 3 7.5 3s7.5-1.34 7.5-3v-6" />
    </svg>
  );
}

export function NetworkMeshIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M8.5 7.5 15.5 6" />
      <path d="M7.5 9.5 11 16" />
      <path d="M16.5 8 13 16" />
      <circle
        cx="6.5"
        cy="7.5"
        r="2.5"
        className="fill-[#FBE8EE] dark:fill-[#332029]"
      />
      <circle
        cx="17.5"
        cy="6"
        r="2.5"
        className="fill-[#E9EEF9] dark:fill-[#22293F]"
      />
      <circle
        cx="12"
        cy="18"
        r="2.5"
        className="fill-[#E1F4F0] dark:fill-[#1B3330]"
      />
    </svg>
  );
}

export function TerminalWindowIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="3"
        y="4"
        width="18"
        height="16"
        rx="3"
        className="fill-[#E9EEF9] dark:fill-[#22293F]"
      />
      <path d="M3 8.5h18" />
      <path d="m7.5 12 2.5 2-2.5 2" stroke="#BE4B72" className="dark:stroke-[#F2A7C0]" />
      <path d="M12.5 16h4" stroke="#2F7A70" className="dark:stroke-[#7ED3C6]" />
    </svg>
  );
}

export function CircuitChipIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <rect
        x="6.5"
        y="6.5"
        width="11"
        height="11"
        rx="2.5"
        className="fill-[#FBE8EE] dark:fill-[#332029]"
      />
      <rect
        x="9.5"
        y="9.5"
        width="5"
        height="5"
        rx="1"
        className="fill-[#E9EEF9] dark:fill-[#22293F]"
      />
      <path d="M9.5 3.5v3M14.5 3.5v3M9.5 17.5v3M14.5 17.5v3M3.5 9.5h3M3.5 14.5h3M17.5 9.5h3M17.5 14.5h3" />
    </svg>
  );
}

export function GitBranchNodeIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path d="M7 8v8" />
      <path d="M17 9a5 5 0 0 1-5 5H7" />
      <circle
        cx="7"
        cy="6"
        r="2.2"
        className="fill-[#FBE8EE] dark:fill-[#332029]"
      />
      <circle
        cx="7"
        cy="18"
        r="2.2"
        className="fill-[#E1F4F0] dark:fill-[#1B3330]"
      />
      <circle
        cx="17"
        cy="7"
        r="2.2"
        className="fill-[#E9EEF9] dark:fill-[#22293F]"
      />
    </svg>
  );
}

export function CloudDeployIcon({ className = 'w-5 h-5', ...props }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      {...props}
    >
      <path
        d="M7 18h10a4 4 0 0 0 .8-7.92A5.5 5.5 0 0 0 7.1 8.5 3.5 3.5 0 0 0 7 18Z"
        className="fill-[#E1F4F0] dark:fill-[#1B3330]"
      />
      <path d="M12 15v-5" stroke="#2F7A70" className="dark:stroke-[#7ED3C6]" />
      <path d="m9.5 12.5 2.5-2.5 2.5 2.5" stroke="#2F7A70" className="dark:stroke-[#7ED3C6]" />
    </svg>
  );
}
