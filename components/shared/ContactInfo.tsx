"use client";

import React, { useState } from "react";
import { Textarea } from "../ui/textarea";
import { Input } from "../ui/input";
import Image from "next/image";
import { createMessage } from "@/lib/actions/message.actions";

interface MessageProps {
  name: string;
  email: string;
  phone: string;
  message: string;
}

const ContactInfo = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const newMessage = await createMessage(formData);
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });
      alert("Message sent successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred while sending the message.");
    }
  };

  return (
    <div className="py-20 px-5 bg-[#e9e8e4]">
      <div className="p-5 font-semibold text-4xl bg-[#ffffff] text-center mb-20">
        Contact
      </div>
      <div className="w-full mb-20">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d501726.5407345099!2d106.36556175435443!3d10.754618130150035!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529292e8d3dd1%3A0xf15f5aad773c112b!2zVGjDoG5oIHBo4buRIEjhu5MgQ2jDrSBNaW5oLCBI4buSIENow60gTWluaCwgVmnhu4d0IE5hbQ!5e0!3m2!1svi!2s!4v1721629732596!5m2!1svi!2s"
          width="100%"
          height="900"
          style={{ border: 0 }}
          allowFullScreen={true}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="flex flex-col md:flex-row justify-between text-gray-800">
        <div className="w-full md:w-1/2 mb-8 md:mb-0 pr-4">
          <h2 className="text-2xl font-bold mb-4">Our Information</h2>
          <p className="mb-6 text-[#666666] text-sm">
            Our web company consists of web programmers and designers with
            extensive experience in the web market. Each of us worked as hired
            worker to create templates for Magento, Shopify, Wordpress and
            others.
          </p>
          <div className="mb-4 flex items-start">
            <div className="w-6 h-6 mr-4">
              <Image src="/icon/home.svg" width={24} height={24} alt="home" />
            </div>
            <div>
              <p className="font-semibold">Address</p>
              <p>1010-white street block, usa</p>
            </div>
          </div>
          <div className="mb-4 flex items-start">
            <div className="w-6 h-6 mr-4">
              <Image src="/icon/phone.svg" width={24} height={24} alt="phone" />
            </div>
            <div>
              <p className="font-semibold">Phone</p>
              <p>+01 0123 456 789</p>
            </div>
          </div>
          <div className="mb-4 flex items-start">
            <div className="w-6 h-6 mr-4">
              <Image src="/icon/mail.svg" width={24} height={24} alt="mail" />
            </div>
            <div>
              <p className="font-semibold">Email</p>
              <p>admin@gmail.com</p>
            </div>
          </div>
          <div className="flex items-start">
            <div className="w-6 h-6 mr-4">
              <Image
                src="/icon/clock-1.svg"
                width={24}
                height={24}
                alt="clock"
              />
            </div>
            <div>
              <p className="font-semibold">Open Hours</p>
              <p>
                Monday to friday 09:30 - 18:30 saturday & sunday 10:00 - 17:00
              </p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 pl-4">
          <h2 className="text-2xl font-bold mb-4">Contact Form</h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone number"
                className="w-full p-3 border border-gray-300 rounded"
                required
              />
            </div>
            <div>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Comment"
                className="w-full p-3 border border-gray-300 rounded"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-gray-800 text-white rounded"
            >
              SEND MESSAGE
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;
