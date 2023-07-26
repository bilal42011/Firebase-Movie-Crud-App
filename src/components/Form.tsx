import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Form = ({ title, description, movie, setMovie, submitHandler }: any) => {
    return (
        <form className="w-[350px] m-auto" onSubmit={submitHandler}>
            <Card>
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl">{`${title} a movie`}</CardTitle>
                    <CardDescription>
                        {description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="title">Title</Label>
                        <Input id="title"
                            type=""
                            required
                            placeholder="Movie title"
                            value={movie.title}
                            onChange={(e) => setMovie({ ...movie, title: e.target.value })} />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="releaseDate">Release Date</Label>
                        <Input id="releaseDate"
                            type="number"
                            required
                            value={movie.releaseDate}
                            onChange={(e) => setMovie({ ...movie, releaseDate: parseInt(e.target.value) })} />
                    </div>
                    <div className="flex flex-row items-center justify-between">
                        <Label htmlFor="hasOscar">Received an Oscar</Label>
                        <Switch
                            id="hasOscar"
                            checked={movie.receivedAnOscar}
                            onCheckedChange={() => setMovie((prevState: any) => ({ ...prevState, receivedAnOscar: !prevState.receivedAnOscar }))}
                        />
                    </div>
                    <div className="grid w-full max-w-sm items-center gap-1.5">
                        <Label htmlFor="picture">Picture</Label>
                        <Input id="picture"
                            type="file"
                            onChange={(e) => e.target.files && setMovie({ ...movie, movieImage: e.target.files[0] })} />
                    </div>
                </CardContent>

                <CardFooter className="grid grid-cols-2 gap-6">
                    <Button className="w-full" type="submit">{`${title} Movie`} </Button>
                </CardFooter>
            </Card>
        </form>
    )
}

export default Form