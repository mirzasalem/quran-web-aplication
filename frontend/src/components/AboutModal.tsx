"use client";

export default function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div className="w-full max-w-md bg-bg-card border border-border rounded-xl p-6 shadow-2xl">
          
          {/* Header */}
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-text-primary">About</h2>
            <button onClick={onClose} className="text-text-muted hover:text-text-primary">
              ✕
            </button>
          </div>

          {/* Content */}
          <div className="space-y-3 text-sm text-text-secondary">
            <p>
              📖 <strong>Al-Quran Web App</strong>
            </p>

            <p>
              Built with ❤️ by <strong>Mirza Salem</strong>
            </p>

            <p>
              🎓 Electrical Engineering Background  
              💻 Passionate about Web + Robotics
            </p>

            <p>
              ⚙️ Tech Stack:
              <br />
              Next.js · TypeScript · Tailwind CSS · Node.js
            </p>

            <p>
              🌍 Goal: Make Quran accessible for everyone, free & simple
            </p>

            <div className="pt-2 border-t border-border">
              <p className="text-xs text-text-muted">
                © {new Date().getFullYear()} All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}