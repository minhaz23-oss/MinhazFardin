"use client";
import axios from "axios";
import { useState } from "react";
import { useInteractiveText } from "@/hooks/useInterectiveText";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import toast,{Toaster} from "react-hot-toast";
import Loader from "@/components/Loader";




const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Invalid email address.",
  }),
  message: z.string().min(5, {
    message: "Message must be at least 5 characters.",
  }),
});

const Contact = () => {
  const [ loading,setLoading ] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setLoading(true)
      const data = await axios.post("/api/sendEmail", values);
      if(data.status === 200){
        toast.success("Email sent successfully");
        form.reset();
      }
      
    } catch (error) {
      console.log(error);
    } finally{
      setLoading(false)
      
    }
  }

  const textRef = useInteractiveText();
  return (
    <section id = "Contact" className="w-full min-h-fit rounded-t-[20px] sm:rounded-t-[50px] py-[30px] px-[30px] sm:px-[100px] text-white bg-black ">
      <Toaster />
      <div className=" w-full h-full flex justify-between items-center hover-target">
        <h1
          ref={textRef}
          className="cursor-default text-[35px] sm:text-[80px] font-extrabold leading-none "
        >
          Contact
        </h1>
        <p className="text-[18px] hidden sm:block font-bold">
          Communication is the only way to know a person better!
        </p>
      </div>
      <div className=" w-full min-h-[200px] flex flex-col justify-center items-center mt-10 bg-white text-black hover-target   rounded-md p-4 pb-5">
        <h1 className=" text-[30px] sm:text-[40px] font-bold">Let's have a chat !!</h1>
        <div className="w-full max-w-[400px] mt-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} >
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem >
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input className=" border border-black" placeholder="Username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel >Email</FormLabel>
                    <FormControl>
                      <Input className=" border border-black" placeholder="email@gmail.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                
                control={form.control}
                name="message"
                render={({ field }) => (
                  <FormItem className="mt-3">
                    <FormLabel>Your message</FormLabel>
                    <FormControl >
                      <Input className=" border border-black" placeholder="write your message here.." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="mt-3" type="submit" variant={"myBtn"}>{loading ? <Loader /> : 'Send'}</Button>
            </form>
          </Form>
        </div>
      </div>
      <div className=" w-full h-fit flex flex-col justify-center items-center mt-10">
        <p className=" text-[30px] sm:text-[40px] font-semibold">My social links</p>
        <div className=" flex items-center gap-5 sm:gap-10 mt-5">
          <a href="https://www.instagram.com/minhaz_fardin02/" target="_blank" className="cursor-pointer">
            <img src="/instagram.png" alt="icon" className="h-[40px] w-[40px]"/>
          </a>
          <a href="https://www.facebook.com/minhaz.fardin.2024/" target="_blank" className="cursor-pointer">
            <img src="/facebook.png" alt="icon" className="h-[40px] w-[40px]"/>
          </a>
          <a href="https://x.com/minhaz_fardin02" target="_blank" className="cursor-pointer">
            <img src="/twitter.png" alt="icon" className="h-[40px] w-[40px]"/>
          </a>
          <a href="https://www.instagram.com/abhishek_rajput_/" target="_blank" className="cursor-pointer">
            <img src="/linkedin.png" alt="icon" className="h-[40px] w-[40px]"/>
          </a>
          <a href="https://github.com/minhaz23-oss" target="_blank" className="cursor-pointer">
            <img src="/Github.png" alt="icon" className="h-[40px] w-[40px]"/>
          </a>
        </div>
        <p className=" text-[18px] italic font-semibold mt-5 ">minhazfardin25@gmail.com</p>
      </div>
    </section>
  );
};

export default Contact;
