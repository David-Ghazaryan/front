import { useState } from "react";
import { Dialog } from "@headlessui/react";
import { Document, Page } from "react-pdf";
import config from "../../config/public";
import { useAuth } from "../../providers/auth";
const ResumeModal = () => {
const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {user?.info?.cvUrl && (
        <button
          onClick={() => setIsOpen(true)}
          className="mt-4 text-[var(--primary)] hover:underline"
        >
          Դիտել Ռեզյումեն →
        </button>
      )}

      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 ">
        <Dialog.Panel className="bg-white p-4 rounded-lg max-w-[90%] max-h-[90vh] overflow-auto">
          <button
            onClick={() => setIsOpen(false)}
            className="text-red-500 mb-2"
          >
            Փակել ✕
          </button>
          <div className="w-full flex justify-center">
            <Document file={`${config.BACK_URL}${user?.info?.cvUrl}`}>
              <Page pageNumber={1} />
            </Document>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
};

export default ResumeModal;