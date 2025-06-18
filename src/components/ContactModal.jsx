import React, { useState, useRef } from 'react';
import { X, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = 'service_tghj0vp';
const EMAILJS_TEMPLATE_ID = 'template_z3qqs3v';
const EMAILJS_PUBLIC_KEY = 'ycc7WwLVTM8IVDNTU';

const ContactModal = ({ isOpen, onClose, language }) => {
  if (!isOpen) return null;

  const formRef = useRef();
  const [isSending, setIsSending] = useState(false);
  const [sendStatus, setSendStatus] = useState({ show: false, isError: false, message: '' });

  const content = {
    en: {
      title: "Get In Touch",
      subtitle: "Fill out the form and I'll get back to you as soon as possible.",
      name: "Name",
      namePlaceholder: "Your name",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      message: "Message",
      messagePlaceholder: "Your message here...",
      sendButton: "Send Message",
      successMessage: "Message sent successfully!",
      errorMessage: "Failed to send message. Please try again."
    },
    vi: {
      title: "Liên Hệ",
      subtitle: "Điền vào form và tôi sẽ phản hồi sớm nhất có thể.",
      name: "Tên",
      namePlaceholder: "Tên của bạn",
      email: "Email",
      emailPlaceholder: "your.email@example.com",
      message: "Tin nhắn",
      messagePlaceholder: "Nội dung tin nhắn...",
      sendButton: "Gửi tin nhắn",
      successMessage: "Đã gửi tin nhắn thành công!",
      errorMessage: "Gửi tin nhắn thất bại. Vui lòng thử lại."
    }
  };

  const t = content[language];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSendStatus({ show: false, isError: false, message: '' });

    try {
      const form = formRef.current;
      console.log('Form data:', {
        name: form.name.value,
        email: form.email.value,
        message: form.message.value,
        to_name: form.to_name.value
      });

      const result = await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        form,
        EMAILJS_PUBLIC_KEY
      );
      
      console.log('Email sent successfully:', result.text);

      setSendStatus({
        show: true,
        isError: false,
        message: t.successMessage
      });
      
      // Reset form
      form.reset();
      
      // Close modal after 2 seconds on success
      setTimeout(() => {
        onClose();
      }, 2000);
    } catch (error) {
      console.error('Failed to send email:', error);
      if (error && error.response) {
        console.error('EmailJS error response:', error.response);
      }
      setSendStatus({
        show: true,
        isError: true,
        message: `${t.errorMessage} (${error?.message || error?.text || 'Unknown error'})`
      });
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-gray-900/95 w-full max-w-lg m-4 rounded-xl shadow-2xl border border-emerald-700/30">
        {/* Close button */}
        <div className="flex justify-end p-4">
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-emerald-400 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="px-6 pb-6">
          <h2 className="text-2xl font-bold text-emerald-400 mb-2">{t.title}</h2>
          <p className="text-gray-400 mb-6">{t.subtitle}</p>

          <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-300 mb-2">
                {t.name}
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-gray-300"
                placeholder={t.namePlaceholder}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-gray-300 mb-2">
                {t.email}
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-gray-300"
                placeholder={t.emailPlaceholder}
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-gray-300 mb-2">
                {t.message}
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows="4"
                className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-500 text-gray-300 resize-none"
                placeholder={t.messagePlaceholder}
              ></textarea>
            </div>

            <input type="hidden" name="to_name" value="MNfine" />

            {sendStatus.show && (
              <div 
                className={`text-sm ${
                  sendStatus.isError ? 'text-red-400' : 'text-emerald-400'
                } text-center`}
              >
                {sendStatus.message}
              </div>
            )}

            <button
              type="submit"
              disabled={isSending}
              className="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isSending ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                t.sendButton
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
