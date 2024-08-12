"use client";
import { getAllUsers, deleteUser } from "@/lib/actions/user.actions";
import Image from "next/legacy/image";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
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
import { User } from "@/types";

const Leaderboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers: User[] = await getAllUsers();
        setUsers(fetchedUsers);
        console.log(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleDelete = async (ClerkId: string) => {
    try {
      await deleteUser(ClerkId);
      // Refresh the page or re-fetch the users
      const fetchedUsers: User[] = await getAllUsers();
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error deleting user:", error);
    }
  };

  return (
    <div className="w-full p-4">
      <div className="flex-center w-full">
        <h2 className="text-2xl font-semibold mb-4">Leaderboard</h2>
      </div>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr className="bg-gray-100">
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Email
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Username
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              First Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Last Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Photo
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Is Admin
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user.email}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user.username}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user.firstName}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user.lastName}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Image
                  src={user.photo}
                  alt={`${user.username}'s photo`}
                  width={24}
                  height={24}
                  className="rounded-full"
                />
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                {user.isAdmin ? "Admin" : "User"}
              </td>
              <td className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="destructive">Delete Profile</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Delete Profile</DialogTitle>
                      <DialogDescription>
                        Are you sure you want to delete this profile? This
                        action cannot be undone.
                      </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                      <div className="w-full flex-center">
                        <div className="w-[50%] flex justify-between">
                          <DialogClose asChild>
                            <Button type="button" variant="outline">
                              Cancel
                            </Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => {
                                handleDelete(user.clerkId);
                              }}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </div>
                      </div>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Leaderboard;
