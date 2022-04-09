import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({ required: true })
    email: string;

    @Prop({ required: true })
    password: string;

    @Prop({ default: true })
    isActive: boolean;

    @Prop({ default: false })
    isAdmin: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);