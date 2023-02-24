import React, { memo } from "react";
import twemoji from "twemoji";

const Twemoji = ({ emoji }: { emoji: string }) => (
  <span
    className="inline-block h-1 w-auto align-text-bottom"
    dangerouslySetInnerHTML={{
      __html: twemoji.parse(emoji, {
        folder: "svg",
        ext: ".svg",
      }),
    }}
  />
);

export default memo(Twemoji);
