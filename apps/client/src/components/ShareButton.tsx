import { Check, Copy, Share2 } from "lucide-react";
import { useState } from "react";
import { Button } from "./Button.js";

export function ShareButton({ roomCode }: { roomCode: string }) {
  const [message, setMessage] = useState<string | null>(null);

  const handleShare = async () => {
    const inviteUrl = `${window.location.origin}/room/${roomCode}`;

    try {
      if (navigator.share !== undefined) {
        await navigator.share({
          title: "Join my Multiplayer Blueprint room",
          text: `Join room ${roomCode}`,
          url: inviteUrl
        });
        setMessage("Shared");
        return;
      }

      await navigator.clipboard.writeText(inviteUrl);
      setMessage("Copied");
    } catch {
      setMessage("Could not share");
    } finally {
      window.setTimeout(() => setMessage(null), 2200);
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <Button
        type="button"
        variant="secondary"
        onClick={handleShare}
        icon={navigator.share !== undefined ? <Share2 size={16} /> : <Copy size={16} />}
      >
        Invite
      </Button>
      {message !== null ? (
        <span className="inline-flex items-center gap-1 text-sm font-medium text-teal-800">
          {message === "Copied" || message === "Shared" ? (
            <Check size={15} />
          ) : null}
          {message}
        </span>
      ) : null}
    </div>
  );
}
