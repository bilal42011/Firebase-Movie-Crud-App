import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth";
import { Icons } from "@/components/icons";


const Auth = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    console.log(auth?.currentUser);
    console.log(auth);
    const signIn: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        }
        catch (err) {
            console.error(err);
        }
    }

    const logout: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await signOut(auth);
        }
        catch (err) {
            console.error(err);
        }
    }

    const signInWithGoogle: React.MouseEventHandler<HTMLButtonElement> = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
        }
        catch (err) {
            console.error(err);
        }
    }

    return (
        <Card className="w-[350px] m-auto">
            <CardHeader className="space-y-1">
                <CardTitle className="text-2xl">Create an account</CardTitle>
                <CardDescription>
                    Enter your email below to login into your account
                </CardDescription>
            </CardHeader>

            <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-6">
                    <Button variant="outline">
                        <Icons.gitHub className="mr-2 h-4 w-4" />
                        Github
                    </Button>
                    <Button variant="outline" onClick={signInWithGoogle}>
                        <Icons.google className="mr-2 h-4 w-4" />
                        Google
                    </Button>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                        </span>
                    </div>
                </div>

                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email"
                        type="email"
                        required
                        placeholder="m@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password"
                        type="password"
                        required
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
            </CardContent>

            <CardFooter className="grid grid-cols-2 gap-6">
                <Button className="w-full" onClick={signIn}>Sign Up</Button>
                <Button className="w-full" onClick={logout}>Sign out</Button>
            </CardFooter>
        </Card>
    )
}

export default Auth