"use client";

import { useState, useEffect } from "react";
import EmojiPicker, { EmojiClickData, Theme } from "emoji-picker-react";

interface CustomEmojiProps {
    title: string;
    setTitle: (value: string) => void;
}

const CustomEmoji: React.FC<CustomEmojiProps> = ({ title, setTitle }) => {
    const [showEmojiPicker, setShowEmojiPicker] = useState<boolean>(false);

    const emojiRegex = /[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F700}-\u{1F77F}\u{1F780}-\u{1F7FF}\u{1F800}-\u{1F8FF}\u{1F900}-\u{1F9FF}\u{1FA00}-\u{1FA6F}\u{1FA70}-\u{1FAFF}\u{1F200}-\u{1F2FF}]/gu;

    const countEmojis = (text: string) => {
        return (text.match(emojiRegex) || []).length;
    };

    // Define custom emojis
    const customEmojis = [
        {
            id: "sparkles",
            names: ["Sparkles", "Shiny"],
            imgUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/2728.png",
        },
        {
            id: "fire",
            names: ["Fire", "Lit"],
            imgUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f525.png",
        },
        {
            id: "rocket",
            names: ["Rocket", "Fast"],
            imgUrl: "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/72x72/1f680.png",
        },
        {
            id: "lookbro",
            names: ["Lookbro", "Luffy"],
            imgUrl: "/images/emojis/lookbro.png",
        },
        {
            id: "kek",
            names: ["kek", "el"],
            imgUrl: "/images/emojis/kek.png",
        },
        {
            id: "rollcat",
            names: ["rollingcat", "rollcat"],
            imgUrl: "/images/emojis/rollingcat.gif",
        },
        {
            id: "mog",
            names: ["mog", "mogged"],
            imgUrl: "/images/emojis/mog.png",
        },
        {
            id: "trump",
            names: ["trump", "trumpass"],
            imgUrl: "/images/emojis/trump.png",
        },

        {
            id: "kamala",
            names: ["kamala", "coconut"],
            imgUrl: "/images/emojis/kamala.png",
        },
    ];

    // Handle adding emojis via picker
    const handleEmojiClick = (emojiData: EmojiClickData) => {
        const customEmoji = customEmojis.find(emoji => emoji.id === emojiData.unified); // Check for custom emoji

        if (customEmoji) {
            if (countEmojis(title) < 5) {
                // Make sure the image is inline and properly sized
                //@ts-ignore
                setTitle((prev) => prev + `<img src="${customEmoji.imgUrl}" alt="${customEmoji.names[0]}" style="width: 25px; height: 25px; display: inline; margin: 0px 5px 4px 0px;" />`);
            }
        } else {
            if (countEmojis(title) < 5) {
                //@ts-ignore
                setTitle((prev) => prev + emojiData.emoji); // For standard emojis
            }
        }

        setShowEmojiPicker(false);
    };

    // Prevent typing by blocking all keys except Backspace and Delete
    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key !== "Backspace" && e.key !== "Delete") {
            e.preventDefault(); // Prevent any typing
        }
    };

    // Prevent pasting non-emoji content
    const handlePaste = (e: React.ClipboardEvent<HTMLDivElement>) => {
        e.preventDefault(); // Block paste event completely
    };

    // Disable the Emoji Picker search bar auto-focus
    useEffect(() => {
        if (showEmojiPicker) {
            const searchInput = document.querySelector('.EmojiPickerReact input');
            if (searchInput) {
                (searchInput as HTMLInputElement).blur();
            }
        }
    }, [showEmojiPicker]);

    return (
        <>
            <div className="relative">
                <div
                    className="appearance-none bg-n0 border border-n0 text-n7 text-2xl rounded-lg focus:outline-none focus:ring-0 focus:border-n2 block w-full py-3 px-3 placeholder:text-base"
                    contentEditable
                    onInput={(e) => setTitle(e.currentTarget.innerHTML)}
                    dangerouslySetInnerHTML={{ __html: title }}  // Set HTML content (including emoji images)
                    onKeyDown={handleKeyDown}  // Disable typing
                    onPaste={handlePaste}  // Prevent pasting
                    style={{ minHeight: "50px" }}  // Ensure a decent height for the div
                />
                <button
                    type="button"
                    className="absolute right-0 top-0 text-2xl bg-p1 p-3 rounded-lg hover:bg-n8 transition-colors duration-300"
                    onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                >
                    😀
                </button>
            </div>
            {showEmojiPicker && (
                <div className="absolute z-10 mt-2">
                    <EmojiPicker
                        onEmojiClick={handleEmojiClick}
                        theme={Theme.DARK}
                        customEmojis={customEmojis}  // Add custom emojis here
                    />
                </div>
            )}
        </>
    );
};

export default CustomEmoji;
