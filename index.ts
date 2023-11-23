import mongoose, { Schema } from "mongoose"

const schema = {
    title: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, default: false },
}

export class DatabaseCollection {
    collection: string
    model: any
    connectionUrl: string | undefined
    mongoose: any
    schema: any

    constructor({
        collection,
        schema,
        connectionUrl,
        mongoose,
    }: {
        collection: string
        schema: any
        connectionUrl?: string | undefined
        mongoose?: any
    }) {
        this.mongoose = mongoose
        this.collection = collection
        this.schema = schema
        this.connectionUrl = connectionUrl
    }

    async connect(connectionUrl: string) {
        await this.mongoose.connect(connectionUrl)
    }

    async disconnect() {
        await this.mongoose.disconnect()
    }

    async init() {
        const schema = new this.mongoose.Schema(this.schema)
        if (this.connectionUrl) {
            await this.connect(this.connectionUrl)
        }

        this.model = this.mongoose.model(this.collection, schema)
    }
}

export const test = async (
    databaseConnectionUri: string = "mongodb://localhost:27017/tododb",
) => {
    // Connect to MongoDB
    await mongoose.connect(databaseConnectionUri)
    console.log("Connected to MongoDB")

    const service = new DatabaseCollection({
        collection: "todos",
        schema,
    })

    // Create a new todo
    const newTodo: any = {
        title: "Learn TypeScript",
        description: "Study and practice TypeScript",
        completed: false,
    }

    const createdTodo = await service.model.create(newTodo)
    console.log("Created Todo:", createdTodo)

    // Find all todos
    const allTodos = await service.model.find()
    console.log("All Todos:", allTodos)

    // Find a todo by ID
    const todoById = await service.model
        .findById(createdTodo._id)
        .lean({
            _id: {
                $toString: "$_id",
            },
        })
        .exec()
    console.log("Todo by ID:", todoById)

    // Update a todo by ID
    const updatedTodo = await service.model.findByIdAndUpdate(
        createdTodo._id,
        { completed: true },
        { new: true },
    )
    console.log("Updated Todo:", updatedTodo)

    // Delete a todo by ID
    await service.model.findByIdAndDelete(createdTodo._id)
    console.log("Todo deleted")

    // Close MongoDB connection
    await mongoose.disconnect()
    console.log("Disconnected from MongoDB")
}

// test().catch((error) => console.error(error));
