"use client";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import { motion } from "framer-motion";
import { Mail, MessageCircle, Phone, Copy } from "lucide-react";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const Contact = () => {
  const textRef = useInteractiveText();
  const [copiedEmail, setCopiedEmail] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("minhazfardin25@gmail.com");
    setCopiedEmail(true);
    toast.success("Email copied to clipboard!");
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-8 h-8" />,
      title: "Email Me",
      description: "minhazfardin25@gmail.com",
      action: () => copyEmail(),
      buttonText: copiedEmail ? "Copied!" : "Copy Email",
      bgColor: "from-blue-500 to-blue-600",
    },
    {
      icon: <MessageCircle className="w-8 h-8" />,
      title: "Let's Chat",
      description: "Quick response on social media",
      action: () => window.open("https://www.instagram.com/minhaz_fardin02/", "_blank"),
      buttonText: "Message on Instagram",
      bgColor: "from-pink-500 to-purple-600",
    },
    {
      icon: <Phone className="w-8 h-8" />,
      title: "WhatsApp Call",
      description: "Quick call or message on WhatsApp",
      action: () => window.open("https://wa.me/8801309766260", "_blank"),
      buttonText: "Chat on WhatsApp",
      bgColor: "from-green-500 to-emerald-600",
    },
  ];

  return (
    <section id="Contact" className="w-full min-h-screen rounded-t-[20px] sm:rounded-t-[50px] py-[30px] px-[30px] sm:px-[100px] text-white bg-black">
      <Toaster />
      <div className="w-full h-full flex justify-between items-center hover-target">
        <h1
          ref={textRef}
          className="cursor-default text-[35px] sm:text-[80px] font-extrabold leading-none"
        >
          Contact
        </h1>
        <p className="text-[18px] hidden sm:block font-bold">
          Communication is the only way to know a person better!
        </p>
      </div>

      <div className="w-full mt-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-[30px] sm:text-[50px] font-bold mb-4">
            Let's Work Together
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Choose your preferred way to reach out. I'm always excited to discuss new projects and opportunities!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 hover:scale-105 transition-all duration-300 border border-gray-700 hover:border-gray-600 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${method.bgColor} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
              
              <div className="relative z-10">
                <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${method.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  {method.icon}
                </div>
                
                <h3 className="text-2xl font-bold mb-2">{method.title}</h3>
                <p className="text-gray-400 mb-6 min-h-[48px]">{method.description}</p>
                
                <button
                  onClick={method.action}
                  className={`w-full py-3 px-4 rounded-lg bg-gradient-to-r ${method.bgColor} text-white font-semibold hover:shadow-lg hover:shadow-${method.bgColor}/50 transition-all duration-300 flex items-center justify-center gap-2`}
                >
                  {method.buttonText}
                  {method.title === "Email Me" && <Copy className="w-4 h-4" />}
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="w-full bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700"
        >
          <div className="text-center mb-8">
            <h3 className="text-[25px] sm:text-[35px] font-bold mb-2">Connect on Social Media</h3>
            <p className="text-gray-400">Follow me for updates and behind-the-scenes content</p>
          </div>
          
          <div className="flex items-center justify-center gap-5 sm:gap-8 flex-wrap">
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.instagram.com/minhaz_fardin02/"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-pink-500 to-purple-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src="/instagram.png" alt="Instagram" className="h-[50px] w-[50px] relative z-10" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.facebook.com/minhaz.fardin.2024/"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-blue-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src="/facebook.png" alt="Facebook" className="h-[50px] w-[50px] relative z-10" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://x.com/minhaz_fardin02"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-sky-500 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src="/twitter.png" alt="Twitter" className="h-[50px] w-[50px] relative z-10" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, rotate: -5 }}
              whileTap={{ scale: 0.95 }}
              href="https://www.linkedin.com/in/minhaz-fardin/"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-blue-700 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src="/linkedin.png" alt="LinkedIn" className="h-[50px] w-[50px] relative z-10" />
            </motion.a>
            
            <motion.a
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              href="https://github.com/minhaz23-oss"
              target="_blank"
              className="group relative"
            >
              <div className="absolute inset-0 bg-gray-600 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
              <img src="/Github.png" alt="GitHub" className="h-[50px] w-[50px] relative z-10" />
            </motion.a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <p className="text-gray-500 text-sm">
            © 2024 Minhaz Fardin. All rights reserved.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;
