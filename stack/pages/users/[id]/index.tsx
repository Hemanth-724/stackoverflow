import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import Mainlayout from "@/Layout/Mainlayout";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { getUserById, updateProfile } from "@/lib/api";
import { useAuth } from "@/context/authcontext";
import { toast } from "react-toastify";
import moment from "moment";

const UserProfile = () => {
    const router = useRouter();
    const { id } = router.query;
    const { user: loggedInUser } = useAuth();

    const [user, setUser] = useState<any>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isSaving, setIsSaving] = useState(false);
    const [editForm, setEditForm] = useState({
        name: "",
        about: "",
        tags: [] as string[],
    });
    const [newTag, setNewTag] = useState("");

    useEffect(() => {
        if (!id) return;

        const fetchUser = async () => {
            try {
                const { data } = await getUserById(id as string);
                setUser(data);
                setEditForm({
                    name: data.name || "",
                    about: data.about || "",
                    tags: data.tags || [],
                });
            } catch (error) {
                console.error("Failed to fetch user:", error);
                toast.error("Could not load user profile.");
            }
        };

        fetchUser();
    }, [id]);

    const handleSaveProfile = async () => {
        if (!user) return;
        setIsSaving(true);
        try {
            const { data } = await updateProfile(user._id, {
                name: editForm.name,
                about: editForm.about,
                tags: editForm.tags,
            });
            setUser({ ...user, ...data });
            setIsEditing(false);
            toast.success("Profile updated successfully!");
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Failed to save profile");
        } finally {
            setIsSaving(false);
        }
    };

    const handleAddTag = () => {
        const trimmedTag = newTag.trim().toLowerCase();
        if (trimmedTag && !editForm.tags.includes(trimmedTag)) {
            setEditForm({ ...editForm, tags: [...editForm.tags, trimmedTag] });
            setNewTag("");
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setEditForm({
            ...editForm,
            tags: editForm.tags.filter((tag: string) => tag !== tagToRemove),
        });
    };

    // Only the logged-in user can edit their own profile
    const isOwnProfile = loggedInUser && user && loggedInUser._id === user._id;

    if (!user) {
        return (
            <Mainlayout>
                <div className="w-full flex-1 pb-8 p-8 text-center text-gray-500">
                    Loading profile...
                </div>
            </Mainlayout>
        );
    }

    return (
        <Mainlayout>
        <div className="w-full flex-1 pb-8">
            {/* Profile Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
                <div className="flex items-center gap-4">
                    <div className="w-24 h-24 bg-[#f8f9f9] border border-[#d6d9dc] rounded-md shadow-sm flex items-center justify-center text-[36px] font-normal text-[#525960] uppercase">
                        {user.name ? user.name.charAt(0) : "U"}
                    </div>
                    <div>
                        <h1 className="text-[34px] mb-1 text-[#242729] font-normal">{user.name}</h1>
                        <div className="text-[#6a737c] text-[13px] flex items-center gap-4">
                            <div className="flex items-center gap-1">
                                <svg aria-hidden="true" className="w-[14px] h-[14px]" viewBox="0 0 14 14" fill="#6a737c"><path d="M11 1.71a.3.3 0 0 1 .53.2v.32H13a1 1 0 0 1 1 1v9.24a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V3.25a1 1 0 0 1 1-1h1.47v-.32a.3.3 0 0 1 .53-.2L4.1 2.82c.2.2.51.2.71 0L5.9 1.71c.2-.2.51-.2.71 0l1.1 1.11c.2.2.51.2.71 0l1.1-1.11c.2-.2.51-.2.71 0l1.1 1.11c.2.2.51.2.71 0l1.09-1.1Z"/></svg>
                                Member {moment(user.joinDate).fromNow()}
                            </div>
                        </div>
                    </div>
                </div>

                {isOwnProfile && (
                    <Dialog open={isEditing} onOpenChange={setIsEditing}>
                        <DialogTrigger asChild>
                            <Button variant="outline" className="mt-4 md:mt-0 flex items-center gap-2 text-[#3b4045] border-[#9fa6ad] hover:bg-[#f8f9f9] shadow-sm">
                                <svg aria-hidden="true" className="w-4 h-4" viewBox="0 0 18 18"><path d="m13.68 2.15 2.17 2.17c.2.2.2.51 0 .71L6.72 14.16l-2.79.67c-.31.08-.57-.18-.5-.49l.67-2.79L12.97 2.15c.2-.2.51-.2.71 0Z" fill="currentColor"/></svg>
                                Edit Profile
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Profile</DialogTitle>
                            </DialogHeader>
                            <div className="flex flex-col gap-4 py-4">
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-[15px] mb-2">Basic Information</h3>
                                    <label className="text-[13px] font-semibold">Display Name</label>
                                    <Input
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="mt-1"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-[15px] mt-2 mb-2">About</h3>
                                    <label className="text-[13px] font-semibold">About Me</label>
                                    <Textarea
                                        value={editForm.about}
                                        onChange={(e) => setEditForm({ ...editForm, about: e.target.value })}
                                        className="mt-1 min-h-[100px]"
                                        placeholder="Tell us about yourself..."
                                    />
                                </div>
                                <div className="space-y-1">
                                    <h3 className="font-semibold text-[15px] mt-2 mb-2">Skills & Technologies</h3>
                                    <div className="flex gap-2 mb-2">
                                        <Input
                                            placeholder="Add a skill (e.g. javascript)"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                        />
                                        <Button className="bg-[#f48024] hover:bg-[#d67120] text-white" onClick={handleAddTag}>+</Button>
                                    </div>
                                    <div className="flex flex-wrap gap-2 mt-2">
                                        {editForm.tags.map((tag: string) => (
                                            <span key={tag} className="flex items-center gap-1 bg-[#ffebd9] text-[#b35e14] px-2 py-1 rounded-md text-[13px]">
                                                {tag}
                                                <button onClick={() => handleRemoveTag(tag)} className="hover:text-black hover:bg-[#fbd3b1] w-4 h-4 flex items-center justify-center rounded">&times;</button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="flex justify-end gap-2 mt-2">
                                <Button variant="ghost" onClick={() => setIsEditing(false)}>Cancel</Button>
                                <Button 
                                    className="bg-[#0a95ff] hover:bg-[#0074cc] text-white" 
                                    onClick={handleSaveProfile}
                                    disabled={isSaving}
                                >
                                    {isSaving ? "Saving..." : "Save Changes"}
                                </Button>
                            </div>
                        </DialogContent>
                    </Dialog>
                )}
            </div>

            <div className="mb-8">
                <h2 className="text-[21px] mb-3 text-[#242729]">About</h2>
                <div className="border border-[#d6d9dc] rounded p-4 text-[#3b4045] min-h-[100px] leading-relaxed">
                    {user.about || <span className="text-gray-400 italic">This user prefers to keep an air of mystery about them.</span>}
                </div>
            </div>

            <div>
                <h2 className="text-[21px] mb-3 text-[#242729]">Top Tags</h2>
                <div className="border border-[#d6d9dc] rounded p-4 flex flex-wrap gap-2 min-h-[60px]">
                    {user.tags && user.tags.length > 0 ? (
                        user.tags.map((tag: string) => (
                            <span key={tag} className="bg-[#e1ecf4] text-[#39739d] hover:bg-[#d0e3f1] px-2 py-1 rounded text-[13px]">
                                {tag}
                            </span>
                        ))
                    ) : (
                        <span className="text-gray-400 italic text-sm">No tags added yet.</span>
                    )}
                </div>
            </div>
        </div>
        </Mainlayout>
    );
};

export default UserProfile;
