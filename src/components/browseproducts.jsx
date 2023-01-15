import { DisplayProducts } from 'components'

export default function BrowseProducts() {
    const filter = "all"
    const highlighted = "Browse"
    const normal = "Products"

    return (
        <div className="flex flex-col">
            <div className="flex flex-row justify-between items-center mb-5 md:mb-0 px-4 md:px-7">
                <a href={`/products?filter=${filter}&page=1`} className="flex flex-row text-xl font-bold">
                    <h6 className="text-primary mr-2">{highlighted}</h6>
                    <h6 className="w-max text-gray-900">{normal}</h6>
                </a>
                <div className="mx-4 w-full bg-gray-200 h-1 "></div>
            </div>
            <div className="bg-gray-100 mt-3 shadow pb-6">
                <div className="md:py-4 flex justify-center">
                    <DisplayProducts className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4" filter={filter} set={(e) => { }} />
                </div>
                <div className="flex flex-col justify-center items-center mt-5">
                    <a href={`/products?filter=${filter}&page=1`} className="w-96 py-2 bg-white rounded shadow text-gray-500 text-center hover:bg-white/50">See More</a>
                </div>
            </div>
        </div>
    )
}
