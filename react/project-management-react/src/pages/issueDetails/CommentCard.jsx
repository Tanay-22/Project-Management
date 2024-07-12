import React from 'react';
import {Avatar, AvatarFallback} from "@/components/ui/avatar.jsx";

const CommentCard = () =>
{
    return (
        <div className="flex justify-between">
            <div className="flex items-center gap-4">

                <Avatar>
                    <AvatarFallback>D</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                    <p>Code with DogRaj</p>
                    <p>Hui hui hui</p>
                </div>
            </div>
        </div>
    );
};

export default CommentCard;