module.exports = mongoose => {
    const schema = mongoose.Schema({
        email: { type: String, required: true },
    },
    { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Subscriber = mongoose.model("subscriber", schema);
    return Subscriber;
};