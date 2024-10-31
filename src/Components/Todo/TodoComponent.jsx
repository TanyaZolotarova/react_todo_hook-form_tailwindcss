import {TitleTextComponent} from "../UI/TitleTextComponent";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {BtnComponent} from "./Components/BtnComponent";
import {TextFieldComponent} from "./Components/TextFieldComponent";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";


export function TodoComponent() {
    const taskSchema = z.object({
        task: z.string().min(5, {message: "Must be 5 or more characters long"})
            .max(25, {message: "Must be 25 or fewer characters long"})
    });

    const {register, handleSubmit, reset, formState: {errors}} = useForm({
        resolver: zodResolver(taskSchema),
    });

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem('tasks');
        return savedTasks ? JSON.parse(savedTasks) : [];
    });


    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    function onSubmit(data) {
        setTasks((prevTasks) => [
            ...prevTasks,
            {id: Date.now(), text: data.task, completed: false}
        ]);
        reset();
    }

    function toggleTaskCompletion(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? {...task, completed: !task.completed} : task
            )
        );
    }

    function deleteTask(id) {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
    }

    return (
        <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
            <TitleTextComponent title={'To-Do List'}/>
            <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2 mb-4">
                <input
                    {...register("task", {required: true})}
                    placeholder="New task"
                    className="flex-1 p-2 border border-gray-300 rounded
                     focus:outline-none focus:ring focus:ring-green-300"
                />
                <BtnComponent title={'ADD TASK'} type={"submit"}
                              className={"px-4 py-2 bg-lime-500 text-white font-semibold font-sans rounded hover:bg-lime-400 transition duration-200"}/>
            </form>
            {errors.task && (
                <p className="text-red-500 text-sm">{errors.task.message}</p>
            )}
            <ul className="space-y-3">
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-3 p-2 border-b border-gray-200">
                        <TextFieldComponent
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => toggleTaskCompletion(task.id)}
                            className="text-green-500 focus:ring-green-400"
                        />
                        <span className={`font-serif flex-1 ${task.completed ? "text-gray-400" : "text-gray-700"}`}>
                            {task.text}
                        </span>
                        <button onClick={() => deleteTask(task.id)}
                                className="font-serif text-red-950 hover:text-red-500 transition duration-200">
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}