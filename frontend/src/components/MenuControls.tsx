import { useDispatch, useSelector } from "react-redux";

import classes from "./MenuControls.module.css";
import { changeTheme } from "../redux/themeState/themeSlice";
import { Themes } from "../redux/themeState/themeSlice";
import { TRootState } from "../redux/store";
import { useEffect, useRef, useState } from "react";

const THEMES_BTN: Themes[] = [
  "peach-theme",
  "purple-theme",
  "green-theme",
  "blue-theme",
  "pink-theme",
];

const MEOW_SOUNDS = [
  "sounds/meow-1.mp3",
  "sounds/meow-2.mp3",
  "sounds/meow-3.mp3",
];

export default function MenuControls() {
  const theme = useSelector((state: TRootState) => state.themes.theme);
  const dispatch = useDispatch();

  const [isThemeMenuVisible, setIsThemeMenuVisible] = useState<boolean>(false);
  const [isMusicTurnOn, setIsMusicTurnOn] = useState<boolean>(false);
  const [isSoundTurnOn, setIsSoundTurnOn] = useState<boolean>(false);

  const musicRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    musicRef.current = new Audio("sounds/music.mp3");
    musicRef.current.loop = true;
  }, []);

  useEffect(() => {
    if (!musicRef.current) return;

    if (isMusicTurnOn) {
      musicRef.current.play().catch((e) => console.error(e));
    } else {
      musicRef.current.pause();
    }
  }, [isMusicTurnOn]);

  useEffect(() => {
    const handleClick = () => {
      if (!isSoundTurnOn) return;

      const randomIndex = Math.floor(Math.random() * MEOW_SOUNDS.length);
      const randomMeow = MEOW_SOUNDS[randomIndex];

      const meowAudio = new Audio(randomMeow);
      meowAudio.play().catch((e) => console.error(e));
    };

    window.addEventListener("click", handleClick);

    return () => {
      window.removeEventListener("click", handleClick);
    };
  }, [isSoundTurnOn]);

  const toggleIsThemeMenuVisible = () => {
    setIsThemeMenuVisible((prev) => !prev);
  };

  const toggleMusic = () => {
    setIsMusicTurnOn((prev) => !prev);
  };

  const toggleSound = () => {
    setIsSoundTurnOn((prev) => !prev);
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
      <button onClick={toggleMusic}>
        {isMusicTurnOn ? (
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
        ) : (
          <svg
            width="33"
            height="27"
            viewBox="0 0 33 27"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{ transform: "translateX(-1px)" }}
          >
            <g clipPath="url(#clip0_119_376)">
              <path
                d="M12.7838 22.9035C12.7672 21.6593 12.0541 20.5539 10.9596 19.8531C10.1902 19.3605 9.23337 19.0676 8.19528 19.0676C5.66472 19.0676 3.60678 20.8112 3.60678 22.9526C3.60678 25.094 5.66472 26.8392 8.19528 26.8392C10.7258 26.8392 12.7854 25.0957 12.7854 22.9526C12.7854 22.9357 12.7854 22.9204 12.7854 22.9035H12.7838ZM8.19528 24.9772C6.69618 24.9772 5.43091 24.0512 5.43091 22.9526C5.43091 21.854 6.69618 20.9297 8.19528 20.9297C9.69437 20.9297 10.9215 21.8269 10.9596 22.9018C10.9596 22.9187 10.9596 22.9357 10.9596 22.9526C10.9596 24.0512 9.69271 24.9772 8.19362 24.9772H8.19528Z"
                fill="currentColor"
              />
              <path
                d="M27.6139 16.4354C26.8444 15.9428 25.8859 15.6499 24.8495 15.6499C23.6854 15.6499 22.6208 16.0189 21.8115 16.6266C21.2974 17.0109 20.8862 17.4917 20.6159 18.035L22.115 19.2403C22.236 18.6681 22.697 18.1654 23.3388 17.8539C23.7766 17.6372 24.2973 17.512 24.8495 17.512C26.3486 17.512 27.6139 18.4396 27.6139 19.5365C27.6139 20.0071 27.3817 20.4456 26.997 20.7943C26.5161 21.231 25.7947 21.5239 24.9971 21.556L26.8395 23.0355C27.4646 22.7816 28.0119 22.4092 28.4397 21.9522C29.0649 21.2886 29.438 20.449 29.438 19.5365C29.438 18.272 28.7216 17.1463 27.6139 16.4354Z"
                fill="currentColor"
              />
              <path
                d="M10.9596 14.1466L12.7838 15.6126V22.9525H10.9596V14.1466Z"
                fill="currentColor"
              />
              <path
                d="M29.438 0.93098V19.5364H27.6139V2.21073L12.7838 7.11305V11.7394L10.9596 10.2752V6.43593C10.9596 6.03305 11.215 5.67587 11.5898 5.5506L28.2457 0.045651C28.5243 -0.0474524 28.8277 0.00333127 29.0632 0.177689C29.2987 0.353739 29.438 0.633049 29.438 0.93098Z"
                fill="currentColor"
              />
              <path
                d="M28.8045 8.5757L27.6139 8.96335L16.7056 12.5233L14.6095 13.2072L12.88 11.8174L14.976 11.1335L27.6139 7.00987L28.249 6.80334L28.8045 8.5757Z"
                fill="currentColor"
              />
              <path
                d="M32.8043 26.6445C32.6252 26.8781 32.3566 26.9999 32.0879 26.9999C31.8906 26.9999 31.6916 26.9356 31.5241 26.8002L26.8394 23.0354L24.9971 21.5559L22.115 19.2402L20.6159 18.0349L14.6095 13.2071L12.8799 11.8173L12.7838 11.7394L10.9596 10.2752L0.348241 1.7469C-0.0480906 1.42866 -0.11608 0.842955 0.195678 0.440071C0.507437 0.035494 1.07955 -0.0339104 1.47588 0.284334L10.9596 7.90527L12.7838 9.37123L14.976 11.1334L16.7056 12.5232L21.8115 16.6265L23.3388 17.8538L26.997 20.7942L28.4397 21.952L32.6518 25.3376C33.0481 25.6559 33.1161 26.2416 32.8043 26.6445Z"
                fill="currentColor"
              />
            </g>
            <defs>
              <clipPath id="clip0_119_376">
                <rect width="33" height="27" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
      <button onClick={toggleSound}>
        {isSoundTurnOn ? (
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
        ) : (
          <svg
            width="32"
            height="24"
            viewBox="0 0 32 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clipPath="url(#clip0_118_372)">
              <path
                d="M15.5846 1.38271L7.97135 8.13022H2.63086C1.90272 8.13022 1.31304 8.69642 1.31304 9.39597V14.5034C1.31304 15.2029 1.90272 15.7691 2.63086 15.7691H7.97135L15.5822 22.6196C15.821 22.8348 16.2053 22.6687 16.2053 22.3505V1.65177C16.2053 1.33592 15.8233 1.1698 15.5846 1.38037V1.38271Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22.3694 16.2184L30.687 8.06946"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M30.687 16.2184L22.3694 8.06946"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>
            <defs>
              <clipPath id="clip0_118_372">
                <rect width="32" height="24" fill="white" />
              </clipPath>
            </defs>
          </svg>
        )}
      </button>
    </div>
  );
}
