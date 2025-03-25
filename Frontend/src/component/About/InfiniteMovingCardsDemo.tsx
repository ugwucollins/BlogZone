// import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import { IconFaceMask, IconLocation } from "@tabler/icons-react";
import { MessageCircleCodeIcon, PhoneCallIcon } from "lucide-react";

export function InfiniteMovingCardsDemo() {
  type testimonial = {
    quote: string;
    icon: ReactElement;
    title: string;
    link: string;
    href: string;
  }[];

  const testimonial: testimonial = [
    {
      quote: "we're here to help",
      icon: <MessageCircleCodeIcon size={20} />,
      title: "chat to support",
      link: "support@untitedul.com",
      href: "",
    },
    {
      quote: "speak to our friendly team.",
      icon: <IconFaceMask size={20} />,
      title: "chat to sales",
      link: "sales@untitedul.com",
      href: "",
    },
    {
      quote: "visit our office HQ.",
      icon: <IconLocation size={20} />,
      title: "Visit Us",
      link: "View on Google Maps",
      href: "",
    },
    {
      quote: "mon-Fri 24/7 avaiable",
      icon: <PhoneCallIcon size={20} />,
      title: "Call Us",
      link: "+2348101245121",
      href: "tel:+2348101245121",
    },
  ];
  return (
    <div className="h-[20rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards items={testimonial} direction="right" speed="slow" />
    </div>
  );
}

// const testimonials = [
//   {
//     quote:
//       "It was the best of times, it was the worst of times, it was the age of wisdom, it was the age of foolishness, it was the epoch of belief, it was the epoch of incredulity, it was the season of Light, it was the season of Darkness, it was the spring of hope, it was the winter of despair.",
//     name: "Charles Dickens",
//     title: "A Tale of Two Cities",
//   },
//   {
//     quote:
//       "To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer The slings and arrows of outrageous fortune, Or to take Arms against a Sea of troubles, And by opposing end them: to die, to sleep.",
//     name: "William Shakespeare",
//     title: "Hamlet",
//   },
//   {
//     quote: "All that we see or seem is but a dream within a dream.",
//     name: "Edgar Allan Poe",
//     title: "A Dream Within a Dream",
//   },
//   {
//     quote:
//       "It is a truth universally acknowledged, that a single man in possession of a good fortune, must be in want of a wife.",
//     name: "Jane Austen",
//     title: "Pride and Prejudice",
//   },
//   {
//     quote:
//       "Call me Ishmael. Some years ago—never mind how long precisely—having little or no money in my purse, and nothing particular to interest me on shore, I thought I would sail about a little and see the watery part of the world.",
//     name: "Herman Melville",
//     title: "Moby-Dick",
//   },
// ];
