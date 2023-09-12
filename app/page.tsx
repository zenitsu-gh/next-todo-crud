"use client";

import NewTodo from "@/components/NewTodo";
import { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";

export default function Home() {
  const [todos, setTodos] = useState<any[]>([]);
  const [change, setChange] = useState(false);

  const getTodos = async () => {
    const res = await fetch("/api/new", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      setTodos(data.data);
    } else {
      console.log("Error");
    }
  };

  const handleCheckControl = async (id: any) => {
    const res = await fetch("/api/new", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (res.ok) {
      console.log("Sucees");
    } else {
      console.log("Error");
    }
  };

  const handleDelete = async (id: any) => {
    const res = await fetch("/api/new", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: id }),
    });

    if (res.ok) {
      console.log("Sucees");
    } else {
      console.log("Error");
    }
  };

  useEffect(() => {
    getTodos();
  }, [handleCheckControl, change, handleDelete]);

  return (
    <main className="grid place-items-center px-[100px] py-[50px] relative">
      <NewTodo change={setChange} />

      <div className="flex flex-col mt-5 gap-3">
        {todos?.map((item) => (
          <div
            key={item.id}
            className="w-[500px] h-[50px] rounded bg-[#52FF00] flex items-center justify-between px-[20px]"
          >
            <div className="flex gap-3">
              <input
                type="checkbox"
                className="transform scale-[1.5]"
                onChange={() => handleCheckControl(item.id)}
                checked={item.isChecked ? true : false}
              />
              <h3
                style={{
                  textDecorationThickness: "2px ",
                  textDecorationColor: "black",
                }}
                className={`text-md font-semibold text-white ${
                  item.isChecked && "line-through"
                }`}
              >
                {item.text}
              </h3>
            </div>

            <div className="flex gap-3">
              <MdDelete
                className="text-xl text-red-500 cursor-pointer"
                onClick={() => handleDelete(item.id)}
              />
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
