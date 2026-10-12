import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type FloralVariant =
  | "sprig"
  | "blossom"
  | "lavender"
  | "eucalyptus"
  | "tulip"
  | "daisy"
  | "fern"
  | "babysbreath";

const FLORALS: Record<FloralVariant, ReactNode> = {
  sprig: (
    <>
      <path d="M8 114Q36 78 80 34" /><path d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z" transform="translate(23.0 95.5) rotate(-1.9)" /><path d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z" transform="translate(34.3 82.3) rotate(-96.6)" /><path d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z" transform="translate(45.9 69.5) rotate(0.5)" /><path d="M0 0C4.5 -5.0 10.8 -5.0 15.0 0C10.8 5.0 4.5 5.0 0 0Z" transform="translate(58.2 56.3) rotate(-94.5)" /><path d="M29.6 87.8q-14 -4 -22 -16" /><circle cx="7.6" cy="67.8" r="3.2" /><path d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z" transform="translate(84.0 30.0) rotate(-90.0)" /><path d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z" transform="translate(84.0 30.0) rotate(-18.0)" /><path d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z" transform="translate(84.0 30.0) rotate(54.0)" /><path d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z" transform="translate(84.0 30.0) rotate(126.0)" /><path d="M0 0C3.9 -5.5 9.4 -5.5 13.0 0C9.4 5.5 3.9 5.5 0 0Z" transform="translate(84.0 30.0) rotate(198.0)" /><circle cx="84" cy="30" r="2.4" />
    </>
  ),
  blossom: (
    <>
      <path d="M10 114Q34 80 72 44" /><path d="M0 0C5.1 -6.0 12.2 -6.0 17.0 0C12.2 6.0 5.1 6.0 0 0Z" transform="translate(25.7 93.4) rotate(-0.8)" /><path d="M0 0C5.1 -6.0 12.2 -6.0 17.0 0C12.2 6.0 5.1 6.0 0 0Z" transform="translate(40.6 76.0) rotate(-97.9)" /><path d="M80.8 36.0 L80.9 36.1 L80.9 36.1 L80.9 36.2 L81.0 36.3 L81.0 36.4 L81.0 36.5 L81.0 36.6 L81.0 36.7 L81.0 36.9 L80.9 37.0 L80.9 37.1 L80.8 37.2 L80.8 37.3 L80.7 37.4 L80.6 37.5 L80.5 37.6 L80.4 37.7 L80.2 37.8 L80.1 37.9 L79.9 37.9 L79.8 38.0 L79.6 38.0 L79.4 38.0 L79.3 38.0 L79.1 38.0 L78.9 38.0 L78.7 37.9 L78.5 37.9 L78.3 37.8 L78.2 37.7 L78.0 37.6 L77.8 37.4 L77.7 37.3 L77.5 37.1 L77.4 36.9 L77.3 36.7 L77.2 36.5 L77.1 36.3 L77.0 36.1 L77.0 35.8 L76.9 35.6 L76.9 35.3 L76.9 35.1 L77.0 34.8 L77.0 34.5 L77.1 34.3 L77.2 34.0 L77.3 33.8 L77.5 33.5 L77.6 33.3 L77.8 33.1 L78.1 32.8 L78.3 32.6 L78.5 32.5 L78.8 32.3 L79.1 32.2 L79.4 32.1 L79.7 32.0 L80.0 31.9 L80.4 31.9 L80.7 31.8 L81.0 31.9 L81.4 31.9 L81.7 32.0 L82.1 32.1 L82.4 32.2 L82.7 32.4 L83.1 32.6 L83.4 32.8 L83.7 33.0 L83.9 33.3 L84.2 33.6 L84.4 33.9 L84.6 34.2 L84.8 34.6 L85.0 35.0 L85.1 35.4 L85.2 35.8 L85.2 36.2 L85.2 36.6 L85.2 37.0 L85.2 37.5 L85.1 37.9 L85.0 38.3 L84.8 38.7 L84.6 39.2 L84.4 39.6 L84.2 39.9 L83.9 40.3 L83.6 40.6 L83.2 41.0 L82.8 41.2 L82.4 41.5 L82.0 41.7 L81.5 41.9 L81.1 42.1" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(82.0 36.3) rotate(10.0)" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(80.7 37.9) rotate(70.0)" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(78.7 37.5) rotate(130.0)" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(78.0 35.7) rotate(190.0)" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(79.3 34.1) rotate(250.0)" /><path d="M0 0C4.2 -7.0 10.1 -7.0 14.0 0C10.1 7.0 4.2 7.0 0 0Z" transform="translate(81.3 34.5) rotate(310.0)" />
    </>
  ),
  lavender: (
    <>
      <path d="M16 116Q40 70 64 10" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(37.6 71.8) rotate(-210.4)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(37.6 71.8) rotate(-280.4)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(40.9 64.5) rotate(-210.7)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(40.9 64.5) rotate(-280.7)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(44.2 57.1) rotate(-211.1)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(44.2 57.1) rotate(-281.1)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(47.5 49.6) rotate(-211.5)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(47.5 49.6) rotate(-281.5)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(50.8 41.9) rotate(-211.9)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(50.8 41.9) rotate(-281.9)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(54.1 34.2) rotate(-212.2)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(54.1 34.2) rotate(-282.2)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(57.4 26.2) rotate(-212.5)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(57.4 26.2) rotate(-282.5)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(60.7 18.2) rotate(-212.9)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(60.7 18.2) rotate(-282.9)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(64.0 10.0) rotate(-213.2)" /><path d="M0 0C2.1 -2.6 5.0 -2.6 7.0 0C5.0 2.6 2.1 2.6 0 0Z" transform="translate(64.0 10.0) rotate(-283.2)" /><ellipse cx="64.0" cy="10.0" rx="2.2" ry="3.6" transform="rotate(21.8 64.0 10.0)" /><path d="M34 116Q66 84 98 34" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(62.8 83.6) rotate(-196.4)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(62.8 83.6) rotate(-266.4)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(69.8 74.5) rotate(-197.7)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(69.8 74.5) rotate(-267.7)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(76.9 65.0) rotate(-199.0)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(76.9 65.0) rotate(-269.0)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(83.9 55.1) rotate(-200.2)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(83.9 55.1) rotate(-270.2)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(91.0 44.8) rotate(-201.3)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(91.0 44.8) rotate(-271.3)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(98.0 34.0) rotate(-202.4)" /><path d="M0 0C1.7 -2.1 4.0 -2.1 5.6 0C4.0 2.1 1.7 2.1 0 0Z" transform="translate(98.0 34.0) rotate(-272.4)" /><ellipse cx="98.0" cy="34.0" rx="2.2" ry="3.6" transform="rotate(32.6 98.0 34.0)" />
    </>
  ),
  eucalyptus: (
    <>
      <path d="M8 112Q30 40 98 14" /><circle cx="8.3" cy="93.0" r="5.1" /><path d="M13.9 95.4L8.3 93.0" /><circle cx="27.5" cy="83.5" r="6.1" /><path d="M21.2 80.1L27.5 83.5" /><circle cx="23.2" cy="61.6" r="7.0" /><path d="M29.8 66.1L23.2 61.6" /><circle cx="46.2" cy="59.2" r="7.6" /><path d="M39.7 53.5L46.2 59.2" /><circle cx="45.0" cy="35.5" r="8.0" /><path d="M51.0 42.2L45.0 35.5" /><circle cx="68.7" cy="39.5" r="8.0" /><path d="M63.5 32.2L68.7 39.5" /><circle cx="73.2" cy="15.9" r="7.7" /><path d="M77.4 23.5L73.2 15.9" /><circle cx="95.8" cy="23.6" r="7.1" /><path d="M92.6 16.2L95.8 23.6" />
    </>
  ),
  tulip: (
    <>
      <path d="M26 116Q30 80 46 42" /><path d="M36.0 32.1C36.0 46.5 56.0 46.5 56.0 32.1L50.5 38.4L46.0 29.4L41.5 38.4Z" transform="rotate(20 46 42)" /><path d="M44 116Q58 90 84 66" /><path d="M76.0 58.1C76.0 69.6 92.0 69.6 92.0 58.1L87.6 63.1L84.0 55.9L80.4 63.1Z" transform="rotate(20 84 66)" /><path d="M28 112C14 96 12 76 20 62C26 80 30 96 28 112Z" /><path d="M46 112C62 102 76 98 90 100C76 108 60 112 46 112Z" />
    </>
  ),
  daisy: (
    <>
      <path d="M36 44.0Q28.0 83.0 20 114" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(40.0 40.0) rotate(0.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(38.8 42.8) rotate(45.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(36.0 44.0) rotate(90.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(33.2 42.8) rotate(135.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(32.0 40.0) rotate(180.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(33.2 37.2) rotate(225.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(36.0 36.0) rotate(270.0)" /><path d="M0 0C3.3 -3.4 7.9 -3.4 11.0 0C7.9 3.4 3.3 3.4 0 0Z" transform="translate(38.8 37.2) rotate(315.0)" /><circle cx="36" cy="40" r="3.6" /><path d="M76 33.2Q48.0 78.0 20 114" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(79.2 30.0) rotate(0.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(78.3 32.3) rotate(45.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(76.0 33.2) rotate(90.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(73.7 32.3) rotate(135.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(72.8 30.0) rotate(180.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(73.7 27.7) rotate(225.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(76.0 26.8) rotate(270.0)" /><path d="M0 0C2.6 -2.7 6.3 -2.7 8.8 0C6.3 2.7 2.6 2.7 0 0Z" transform="translate(78.3 27.7) rotate(315.0)" /><circle cx="76" cy="30" r="2.9" /><path d="M70 76.8Q45.0 100.0 20 114" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(72.8 74.0) rotate(0.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(72.0 76.0) rotate(45.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(70.0 76.8) rotate(90.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(68.0 76.0) rotate(135.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(67.2 74.0) rotate(180.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(68.0 72.0) rotate(225.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(70.0 71.2) rotate(270.0)" /><path d="M0 0C2.3 -2.4 5.5 -2.4 7.7 0C5.5 2.4 2.3 2.4 0 0Z" transform="translate(72.0 72.0) rotate(315.0)" /><circle cx="70" cy="74" r="2.5" />
    </>
  ),
  fern: (
    <>
      <path d="M8 114Q20 40 104 18" /><path d="M0 0C5.8 -5.4 14.0 -5.4 19.4 0C14.0 5.4 5.8 5.4 0 0Z" transform="translate(11.1 99.7) rotate(-12.4)" /><path d="M0 0C5.8 -5.4 14.0 -5.4 19.4 0C14.0 5.4 5.8 5.4 0 0Z" transform="translate(11.1 99.7) rotate(-136.4)" /><path d="M0 0C5.5 -5.1 13.2 -5.1 18.3 0C13.2 5.1 5.5 5.1 0 0Z" transform="translate(14.0 90.8) rotate(-7.9)" /><path d="M0 0C5.5 -5.1 13.2 -5.1 18.3 0C13.2 5.1 5.5 5.1 0 0Z" transform="translate(14.0 90.8) rotate(-131.9)" /><path d="M0 0C5.2 -4.8 12.4 -4.8 17.3 0C12.4 4.8 5.2 4.8 0 0Z" transform="translate(17.5 82.4) rotate(-3.1)" /><path d="M0 0C5.2 -4.8 12.4 -4.8 17.3 0C12.4 4.8 5.2 4.8 0 0Z" transform="translate(17.5 82.4) rotate(-127.1)" /><path d="M0 0C4.9 -4.5 11.7 -4.5 16.2 0C11.7 4.5 4.9 4.5 0 0Z" transform="translate(21.6 74.5) rotate(1.8)" /><path d="M0 0C4.9 -4.5 11.7 -4.5 16.2 0C11.7 4.5 4.9 4.5 0 0Z" transform="translate(21.6 74.5) rotate(-122.2)" /><path d="M0 0C4.5 -4.2 10.9 -4.2 15.2 0C10.9 4.2 4.5 4.2 0 0Z" transform="translate(26.3 67.0) rotate(6.8)" /><path d="M0 0C4.5 -4.2 10.9 -4.2 15.2 0C10.9 4.2 4.5 4.2 0 0Z" transform="translate(26.3 67.0) rotate(-117.2)" /><path d="M0 0C4.2 -4.0 10.2 -4.0 14.1 0C10.2 4.0 4.2 4.0 0 0Z" transform="translate(31.7 59.9) rotate(11.8)" /><path d="M0 0C4.2 -4.0 10.2 -4.0 14.1 0C10.2 4.0 4.2 4.0 0 0Z" transform="translate(31.7 59.9) rotate(-112.2)" /><path d="M0 0C3.9 -3.7 9.4 -3.7 13.0 0C9.4 3.7 3.9 3.7 0 0Z" transform="translate(37.7 53.3) rotate(16.8)" /><path d="M0 0C3.9 -3.7 9.4 -3.7 13.0 0C9.4 3.7 3.9 3.7 0 0Z" transform="translate(37.7 53.3) rotate(-107.2)" /><path d="M0 0C3.6 -3.4 8.6 -3.4 12.0 0C8.6 3.4 3.6 3.4 0 0Z" transform="translate(44.3 47.2) rotate(21.6)" /><path d="M0 0C3.6 -3.4 8.6 -3.4 12.0 0C8.6 3.4 3.6 3.4 0 0Z" transform="translate(44.3 47.2) rotate(-102.4)" /><path d="M0 0C3.3 -3.1 7.9 -3.1 10.9 0C7.9 3.1 3.3 3.1 0 0Z" transform="translate(51.6 41.5) rotate(26.2)" /><path d="M0 0C3.3 -3.1 7.9 -3.1 10.9 0C7.9 3.1 3.3 3.1 0 0Z" transform="translate(51.6 41.5) rotate(-97.8)" /><path d="M0 0C3.0 -2.8 7.1 -2.8 9.9 0C7.1 2.8 3.0 2.8 0 0Z" transform="translate(59.5 36.2) rotate(30.6)" /><path d="M0 0C3.0 -2.8 7.1 -2.8 9.9 0C7.1 2.8 3.0 2.8 0 0Z" transform="translate(59.5 36.2) rotate(-93.4)" /><path d="M0 0C2.6 -2.5 6.3 -2.5 8.8 0C6.3 2.5 2.6 2.5 0 0Z" transform="translate(68.0 31.4) rotate(34.8)" /><path d="M0 0C2.6 -2.5 6.3 -2.5 8.8 0C6.3 2.5 2.6 2.5 0 0Z" transform="translate(68.0 31.4) rotate(-89.2)" /><path d="M0 0C2.3 -2.2 5.6 -2.2 7.8 0C5.6 2.2 2.3 2.2 0 0Z" transform="translate(77.2 27.1) rotate(38.6)" /><path d="M0 0C2.3 -2.2 5.6 -2.2 7.8 0C5.6 2.2 2.3 2.2 0 0Z" transform="translate(77.2 27.1) rotate(-85.4)" /><path d="M0 0C2.0 -1.9 4.8 -1.9 6.7 0C4.8 1.9 2.0 1.9 0 0Z" transform="translate(87.0 23.3) rotate(42.2)" /><path d="M0 0C2.0 -1.9 4.8 -1.9 6.7 0C4.8 1.9 2.0 1.9 0 0Z" transform="translate(87.0 23.3) rotate(-81.8)" /><path d="M0 0C1.7 -1.6 4.1 -1.6 5.6 0C4.1 1.6 1.7 1.6 0 0Z" transform="translate(97.4 19.8) rotate(45.5)" /><path d="M0 0C1.7 -1.6 4.1 -1.6 5.6 0C4.1 1.6 1.7 1.6 0 0Z" transform="translate(97.4 19.8) rotate(-78.5)" />
    </>
  ),
  babysbreath: (
    <>
      <path d="M14 116L40 70" /><path d="M40 70L30 40" /><path d="M40 70L64 44" /><path d="M64 44L58 22" /><path d="M64 44L90 38" /><path d="M40 70L78 72" /><path d="M78 72L98 58" /><path d="M78 72L96 90" /><path d="M30 40L18 26" /><path d="M30 40L42 20" /><circle cx="21.3" cy="26.9" r="1.9" /><circle cx="15.6" cy="28.4" r="1.9" /><circle cx="17.1" cy="22.7" r="1.9" /><circle cx="45.3" cy="20.9" r="1.9" /><circle cx="39.6" cy="22.4" r="1.9" /><circle cx="41.1" cy="16.7" r="1.9" /><circle cx="61.3" cy="22.9" r="1.9" /><circle cx="55.6" cy="24.4" r="1.9" /><circle cx="57.1" cy="18.7" r="1.9" /><circle cx="93.3" cy="38.9" r="1.9" /><circle cx="87.6" cy="40.4" r="1.9" /><circle cx="89.1" cy="34.7" r="1.9" /><circle cx="101.3" cy="58.9" r="1.9" /><circle cx="95.6" cy="60.4" r="1.9" /><circle cx="97.1" cy="54.7" r="1.9" /><circle cx="99.3" cy="90.9" r="1.9" /><circle cx="93.6" cy="92.4" r="1.9" /><circle cx="95.1" cy="86.7" r="1.9" /><circle cx="33.3" cy="40.9" r="1.9" /><circle cx="27.6" cy="42.4" r="1.9" /><circle cx="29.1" cy="36.7" r="1.9" /><circle cx="67.3" cy="44.9" r="1.9" /><circle cx="61.6" cy="46.4" r="1.9" /><circle cx="63.1" cy="40.7" r="1.9" /><circle cx="81.3" cy="72.9" r="1.9" /><circle cx="75.6" cy="74.4" r="1.9" /><circle cx="77.1" cy="68.7" r="1.9" />
    </>
  ),
};

interface FloralProps {
  variant?: FloralVariant;
  size?: number;
  className?: string;
}

export function Floral({ variant = "sprig", size = 96, className }: FloralProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      aria-hidden="true"
      className={cn("pointer-events-none text-gold-line", className)}
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeWidth="0.9"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {FLORALS[variant]}
      </g>
    </svg>
  );
}

export function FloralSprig({
  size = 96,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return <Floral variant="sprig" size={size} className={className} />;
}

export type OrnamentCorner =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right";

const CORNER_CLASS: Record<OrnamentCorner, string> = {
  "bottom-left": "-bottom-3 -left-4",
  "bottom-right": "-bottom-3 -right-4 -scale-x-100",
  "top-left": "-top-3 -left-4 -scale-y-100",
  "top-right": "-top-3 -right-4 rotate-180",
};

export interface CornerOrnament {
  variant: FloralVariant;
  corner: OrnamentCorner;
  size?: "lg" | "sm";
}

interface CornerFloralProps extends CornerOrnament {
  className?: string;
}

export function CornerFloral({
  variant,
  corner,
  size = "lg",
  className,
}: CornerFloralProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute block",
        size === "lg" ? "h-36 w-36 md:h-56 md:w-56" : "h-24 w-24 md:h-36 md:w-36",
        CORNER_CLASS[corner],
        className,
      )}
    >
      <Floral variant={variant} size={120} className="h-full w-full" />
    </span>
  );
}

export function DotDivider({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn("flex items-center justify-center gap-3", className)}
    >
      <span className="h-px w-8 bg-gold-line" />
      <span className="h-1.5 w-1.5 rounded-full bg-gold" />
      <span className="h-px w-8 bg-gold-line" />
    </div>
  );
}