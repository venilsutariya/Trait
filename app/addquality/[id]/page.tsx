"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ChevronRight, Image, X } from "lucide-react";
import { constingInput } from "@/lists/inputList";
import CancelDialog from "@/components/customUi/cancelDialog";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "sonner";

const AddQuality = ({ params }: {
    params: any
}) => {
    useEffect(() => {
        if (id !== "noid") {
            axios.get(`/api/get-quality-by-id/${id}`)
                .then((res) => {
                    setFormData({ ...res.data });
                    setImagePreview(res.data.photo);
                })
                .catch((err) => console.log(err));
        }
    }, []);

    const [id, setId] = useState(params.id);
    const [imagePreview, setImagePreview] = useState("");
    let [formData, setFormData] = useState({
        qualityName: "",
        yarnCost: "",
        warpingCost: "",
        extraCost: "",
        jobCost: "",
        addProfit: "",
        sellingPrice: "",
        yarnType: "",
        whichYarn: "",
        yarnDetail: "",
        yarnPattern: "",
        reed: "",
        reedPattern: "",
        drafting: "",
        lessing: "",
    });
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id === "noid") {
            axios.post("/api/add-quality", { ...formData, photo: imagePreview })
                .then((res) => console.log(res))
                .catch((err) => console.log(err));

            toast.success("quality add success Fully");
        } else {
            if (id !== "noid") {
                axios.patch(`/api/edit-quality/${id}`, { ...formData, photo: imagePreview })
                .then((res) => {
                    toast.success("quality edited success Fully");
                })
                .catch((err) => console.log(err))
            }
        }
        if (formRef.current) {
            formRef.current.reset();
        }
        setImagePreview("");
        router.push("/");
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        if (type === "radio") {
            if (checked) {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    }


    const handleCancel = () => {
        // Reset the form
        setImagePreview(""); // Reset the image preview
        if (formRef.current) {
            formRef.current.reset(); // Reset the form
        }

        router.push("/");
    };

    const handleUpload = (result: any) => {
        setImagePreview(result?.info?.secure_url);
    }

    return (
        <div className="px-3 py-3">
            <form ref={formRef} onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <div>
                        <div className="mb-3 underline">Add quality</div>
                        <Input
                            className="mt-1 bg-zinc-100 border-none"
                            type="text"
                            placeholder="Add quality name"
                            name="qualityName"
                            autoFocus
                            value={formData.qualityName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={`mt-3 ${imagePreview !== "" ? "hidden" : "block"}`}>
                        <CldUploadButton
                            options={{ maxFiles: 1 }}
                            onUpload={handleUpload}
                            uploadPreset="brnsm4ej"
                        >
                            <div className="h-40 bg-zinc-100 rounded-md flex justify-center items-center w-40">
                                <Image size={30} />
                            </div>
                        </CldUploadButton>
                    </div>
                    <div className={`mt-3 ${imagePreview === "" ? "hidden" : "block"} flex`}>
                        <img src={imagePreview} className="h-40 w-40 object-cover" alt="image" />
                        {id !== "noid" && <X className="ms-2 cursor-pointer" onClick={() => setImagePreview("")}/>}
                    </div>
                    <div>
                        <div className=" underline mt-4">Costing</div>
                        <div className="grid grid-cols-2 gap-4">
                            {
                                constingInput.map((input, index) => (
                                    <div key={index}>
                                        <label>{input.label}</label>
                                        <Input
                                            className="mt-1 bg-zinc-100 border-none"
                                            type="number"
                                            placeholder={input.placeholder}
                                            name={input.name}
                                            onChange={handleChange}
                                            // @ts-ignore
                                            value={formData[input.name]}
                                        />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div>
                        <div className=" underline mt-4">Construction</div>
                        <div className="radio-input mt-3">
                            <label>
                                <input checked={formData.yarnType === "Satin"} type="radio" onChange={handleChange} id="value-1" name="yarnType" value="Satin" />
                                <span>Satin</span>
                            </label>
                            <label>
                                <input checked={formData.yarnType === "Dobby"} type="radio" onChange={handleChange} id="value-2" name="yarnType" value="Dobby" />
                                <span>Dobby</span>
                            </label>
                            <label>
                                <input checked={formData.yarnType === "Plain"} type="radio" onChange={handleChange} id="value-3" name="yarnType" value="Plain" />
                                <span>Plain</span>
                            </label>
                            <span className="selection"></span>
                        </div>
                        <div className="mt-3 flex gap-x-3">
                            <label className={`flex items-center gap-x-1 cursor-pointer p-2 rounded-md ${formData.whichYarn === "warp yarn" ? 'bg-indigo-100' : ''}`}>
                                <input checked={formData.yarnType === "warp yarn"} type="radio" onChange={handleChange} id="value-1" name="whichYarn" value="warp yarn" className="hidden form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                <span className="text-gray-700">Warp Yarn</span>
                            </label>
                            <label className={`flex items-center gap-x-1 cursor-pointer p-2 rounded-md ${formData.whichYarn === "weft yarn" ? 'bg-indigo-100 ' : ''}`}>
                                <input checked={formData.yarnType === "weft yarn"} type="radio" onChange={handleChange} id="value-2" name="whichYarn" value="weft yarn" className=" hidden form-radio h-4 w-4 text-indigo-600 transition duration-150 ease-in-out" />
                                <span className="text-gray-700">Weft Yarn</span>
                            </label>
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Yarn details</label>
                            <Textarea
                                className="mt-1 bg-zinc-100 border-none"
                                type="text"
                                placeholder={"add yarn details"}
                                name={"yarnDetail"}
                                // @ts-ignore
                                onChange={handleChange}
                                value={formData.yarnDetail}
                            />
                        </div>
                        <div className="mt-3">
                            <label htmlFor="">Yarn pattern</label>
                            <Textarea
                                className="mt-1 bg-zinc-100 border-none"
                                type="text"
                                placeholder="Add yarn pattern"
                                name="yarnPattern"
                                // @ts-ignore
                                onChange={handleChange}
                                value={formData.yarnPattern}
                            />
                        </div>
                        <div className="mt-3">
                            <label>Reed</label>
                            <Input
                                className="mt-1 bg-zinc-100 border-none"
                                type="text"
                                placeholder={"Add reed"}
                                name={"reed"}
                                onChange={handleChange}
                                value={formData.reed}
                            />
                        </div>
                        <div className="mt-3">
                            <label>Reed pattern</label>
                            <Input
                                className="mt-1 bg-zinc-100 border-none"
                                type="text"
                                placeholder={"Add  pattern"}
                                name={"reedPattern"}
                                onChange={handleChange}
                                value={formData.reedPattern}
                            />
                        </div>
                        <div className="mt-3">
                            <label>Drafting</label>
                            <Input
                                className="mt-1 bg-zinc-100 border-none"
                                type="text"
                                placeholder={"Add  drafting"}
                                name={"drafting"}
                                onChange={handleChange}
                                value={formData.drafting}
                            />
                        </div>
                        {
                            formData.yarnType === "Dobby" && (
                                <div className="mt-3">
                                    <label>lessing</label>
                                    <Input
                                        className="mt-1 bg-zinc-100 border-none"
                                        type="text"
                                        placeholder={"Add  lessing"}
                                        name={"lessing"}
                                        onChange={handleChange}
                                        value={formData.lessing}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="mt-7 mb-10 flex">
                        <Button
                            type="submit"
                            className="gap-x-2"
                            size={"sm"}
                        >
                            Add <ChevronRight size={20} />
                        </Button>
                        <CancelDialog handleCancel={handleCancel} />
                    </div>
                </div>
            </form>
        </div>
    );
}

export default AddQuality;
