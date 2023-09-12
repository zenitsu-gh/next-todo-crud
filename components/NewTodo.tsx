"use client"

import React, { useState } from "react";

const NewTodo = ({ change }: { change: any }) => {
    const [text, setText] = useState('')

    const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()

        const res = await fetch('/api/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ text, isChecked: false })
        })

        if (res.ok) {
            console.log('Success')
            change((prev: any) => !prev)
            setText('')
        } else {
            console.log('Failed') 
        }
    }

  return (
    <form className="w-[500px] p-5 flex gap-3" onSubmit={handleSubmit}>
        <input
            type="text"
            placeholder="Add todo..."
            className="w-[400px] px-7 py-2 outline-none text-sm rounded border-[1px] border-[#52FF00]"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
        />

        <button className="px-7 py-2 font-bold text-white bg-[#52FF00] text-xs rounded">Add</button>
    </form>
  );
};

export default NewTodo;
