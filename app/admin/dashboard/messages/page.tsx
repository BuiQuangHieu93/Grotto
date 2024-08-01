"use client";

import { getAllMessage } from "@/lib/actions/message.actions";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

const Messages: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [mailForm, setMailForm] = useState({
    from_name: "",
    to_name: "",
    reply_to: "",
    to_reply: "",
    message: "",
  });

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
  const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const response = await getAllMessage();
        setMessages(response);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    fetchMessages();
  }, []);

  const sendEmail = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (serviceId && templateId && publicKey) {
      try {
        const formData = new FormData();
        formData.append("from_name", mailForm.from_name);
        formData.append("to_name", mailForm.to_name);
        formData.append("reply_to", mailForm.reply_to);
        formData.append("to_reply", mailForm.to_reply);
        formData.append("message", mailForm.message);

        // Convert FormData to plain object
        const formObject: Record<string, unknown> = {};
        formData.forEach((value, key) => {
          formObject[key] = value;
        });

        await emailjs.send(serviceId, templateId, formObject, publicKey);
        console.log("SUCCESS!");
        console.log(mailForm);
      } catch (error: any) {
        console.error("FAILED...", error.text);
      }
    } else {
      console.error("Missing emailJS credentials.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Messages</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Phone
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Message
              </th>
              <th className="px-6 py-3 border-b-2 border-gray-300 bg-gray-100 text-left text-xs leading-4 font-medium text-gray-700 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {messages.map((message) => (
              <tr key={message._id}>
                <td className="px-6 py-4 border-b border-gray-300">
                  {message.name}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {message.email}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {message.phone}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  {message.message}
                </td>
                <td className="px-6 py-4 border-b border-gray-300">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        onClick={() => {
                          setMailForm({
                            from_name: "Grotto Team",
                            to_name: message.name,
                            reply_to: message.email,
                            to_reply: message.message,
                            message: "",
                          });
                        }}
                      >
                        Reply
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <DialogHeader>
                        <DialogTitle>Reply</DialogTitle>
                        <DialogDescription>
                          Reply to the user's message
                        </DialogDescription>
                      </DialogHeader>
                      <form
                        onSubmit={sendEmail}
                        className="space-y-6 p-6 bg-white shadow-md rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label
                            htmlFor="from_name"
                            className="block text-base font-semibold text-gray-800"
                          >
                            From Name
                          </Label>
                          <Input
                            type="text"
                            name="from_name"
                            id="from_name"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-md"
                            defaultValue="Grotto Team"
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="to_name"
                            className="block text-base font-semibold text-gray-800"
                          >
                            To Name
                          </Label>
                          <Input
                            type="text"
                            name="to_name"
                            id="to_name"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-md"
                            value={mailForm.to_name}
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="reply_to"
                            className="block text-base font-semibold text-gray-800"
                          >
                            Reply to Email
                          </Label>
                          <Input
                            type="email"
                            name="reply_to"
                            id="reply_to"
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-md"
                            value={mailForm.reply_to}
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="to_reply"
                            className="block text-base font-semibold text-gray-800"
                          >
                            Message of User
                          </Label>
                          <Textarea
                            name="to_reply"
                            id="to_reply"
                            rows={4}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-md"
                            value={mailForm.to_reply}
                            disabled
                          />
                        </div>

                        <div className="space-y-2">
                          <Label
                            htmlFor="message"
                            className="block text-base font-semibold text-gray-800"
                          >
                            Reply
                          </Label>
                          <Textarea
                            name="message"
                            id="message"
                            rows={4}
                            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-600 focus:ring-indigo-600 sm:text-md"
                            placeholder={`Replying to: ${mailForm.to_reply}`}
                            value={mailForm.message}
                            onChange={(e) =>
                              setMailForm((prevState) => ({
                                ...prevState,
                                message: e.target.value,
                              }))
                            }
                          />
                        </div>

                        <DialogFooter>
                          <DialogClose>
                            <Button
                              type="submit"
                              className="mt-4 w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500"
                            >
                              Send Reply
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </form>
                    </DialogContent>
                  </Dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Messages;
