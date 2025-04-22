import { useDispatch, useSelector } from "react-redux";

import classes from "./MenuControls.module.css";
import { changeTheme } from "../redux/themeState/themeSlice";
import { Themes } from "../redux/themeState/themeSlice";
import { TRootState } from "../redux/store";
import { useState } from "react";

const THEMES_BTN: Themes[] = [
  "peach-theme",
  "purple-theme",
  "green-theme",
  "blue-theme",
  "pink-theme",
];

export default function MenuControls() {
  const theme = useSelector((state: TRootState) => state.themes.theme);
  const dispatch = useDispatch();

  const [isThemeMenuVisible, setIsThemeMenuVisible] = useState<boolean>(false);

  const toggleIsThemeMenuVisible = () => {
    setIsThemeMenuVisible((prev) => !prev);
  };

  return (
    <div id={classes["menu-controls"]}>
      <div
        id={classes["theme-btn"]}
        className={`${isThemeMenuVisible ? classes.active : ""}`}
      >
        <button onClick={toggleIsThemeMenuVisible}>
          <svg
            width="32"
            height="28"
            viewBox="0 0 32 28"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_29_368)">
              <path
                d="M29.836 1.44594L30.4896 2.06775C31.1713 2.71555 31.2523 3.76427 30.6798 4.50673L20.408 17.8246L13.6072 11.3429L27.4197 1.29374C28.1542 0.753598 29.1769 0.816707 29.836 1.44408V1.44594Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M13.6072 11.3411L12.6166 12.4306C11.7013 13.4385 11.7031 14.9661 12.6222 15.9722L15.2062 18.8009C16.2834 19.9814 18.1423 20.0334 19.2874 18.916L20.408 17.8227L13.6072 11.3411Z"
                fill="currentColor"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
              <path
                d="M2.00012 26.8863L10.0966 26.8065C13.417 26.7731 16.0518 24.0371 15.9105 20.7666L15.8804 20.0687L11.4847 15.9128H10.5524C7.45053 15.9128 4.93626 18.3907 4.93626 21.4478V23.0793C4.93626 24.2432 3.97763 25.1879 2.79677 25.1879H1.99258C1.5161 25.1879 1.13189 25.5684 1.13189 26.0362C1.13189 26.5077 1.52363 26.89 2.002 26.8845L2.00012 26.8863Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_29_368">
                <rect width="32" height="28" fill="white" />
              </clipPath>
            </defs>
          </svg>
        </button>
        <div className={classes.themes}>
          {THEMES_BTN.map((btn) => (
            <span
              key={btn}
              onClick={() => dispatch(changeTheme(btn))}
              className={theme === btn ? classes.active : ""}
            >
              ✓
            </span>
          ))}
        </div>
      </div>
      <button>
        <svg
          width="29"
          height="28"
          viewBox="0 0 29 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.93249 26.7402C6.98233 26.7402 8.64406 25.3906 8.64406 23.7258C8.64406 22.061 6.98233 20.7114 4.93249 20.7114C2.88264 20.7114 1.22091 22.061 1.22091 23.7258C1.22091 25.3906 2.88264 26.7402 4.93249 26.7402Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M21.7389 23.2539C23.7887 23.2539 25.4505 21.9043 25.4505 20.2395C25.4505 18.5747 23.7887 17.2251 21.7389 17.2251C19.6891 17.2251 18.0273 18.5747 18.0273 20.2395C18.0273 21.9043 19.6891 23.2539 21.7389 23.2539Z"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M25.4505 20.2395V1.25982L8.64184 6.87631V23.7258"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M8.64184 13.6976L25.4505 8.15445"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button>
        <svg
          width="30"
          height="23"
          viewBox="0 0 30 23"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clipPath="url(#clip0_45_428)">
            <path
              d="M15.7188 1.32511L8.03997 7.79148H2.6535C1.9191 7.79148 1.32434 8.33408 1.32434 9.00448V13.8991C1.32434 14.5695 1.9191 15.1121 2.6535 15.1121H8.03997L15.7164 21.6771C15.9571 21.8834 16.3448 21.7242 16.3448 21.4193V1.58296C16.3448 1.28027 15.9595 1.12107 15.7188 1.32287V1.32511Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M21.7963 8.23318C23.8141 9.92153 23.7852 12.8991 21.7963 14.6502"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M25.006 4.78027C30.1637 7.18835 29.6268 15.4036 25.006 18.0202"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_45_428">
              <rect width="30" height="23" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </button>
    </div>
  );
}
