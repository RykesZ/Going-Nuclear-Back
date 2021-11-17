module.exports = mongoose => {
    const schema = mongoose.Schema({
        title: { type: String, required: true },
        tags: { type: Array, required: true },
        text: { type: String, required: true },
        infographie: { type: String, required: true },
        chartData: { type: Array, required: true },
        verticalUnit: { type: String, required: true },
        horizontalUnit: { type: Array, required: false},
        tickLabels: { type: Array, required: true },
        sources: { type: Array, required: true }
    },
    { timestamps: true }
    );

    schema.method("toJSON", function() {
        const { __v, _id, ...object } = this.toObject();
        object.id = _id;
        return object;
    });

    const Article = mongoose.model("article", schema);
    return Article;
};