module.exports = class SeedPair {
    constructor(schema, data) {
        this.schema = schema;
        this.data = data;
    }
    async seed() {
        try {
            await this.schema.deleteMany({});
            for (let datum of this.data) {
                let datumInDb = new this.schema(datum);
                await datumInDb.save()
            }
            console.log('Seeding succeeded for', this.schema)
        } catch (error) {
            console.log('Seeding failed for', this.schema)
            console.log(error)
        }    
    }
    async logResult() {
        const dataInDb = await this.schema.find({})
        console.log('Current data under the schema', this.schema)
        console.log(dataInDb)
    }
}