import { ISbStoriesParams, getStoryblokApi } from "@storyblok/react/rsc";
import EventsMasonry from "./components/EventsMasonry";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Novedades',
    description: 'Novedades',
    keywords: 'debate, presentaciones, seguridad informática, ciberseguridad, justicia'
}

const Eventos = async () => {
    const { data } = await fetchData();
    return (
        <main className="bg-[#F1F1F1] flex flex-col flex-grow">
            <header className='bg-[#2D2D2D] py-[4vw] px-8 sm:px-[65px] md:px-[130px]'>
                <h1 className='font-nippo text-3xl sm:text-4xl'>
                    NOVEDADES
                </h1>
                <p className='font-nippo text-3xl sm:text-4xl font-bold'>
                    QUE ACCIONES HEMOS LLEVADO A CABO EN EL PROYECTO
                </p>
            </header>
            <section className="py-[4vw] px-8 sm:px-[65px] md:px-[130px] flex-grow">
                <EventsMasonry stories={data.stories} />
            </section>
        </main>
    )
}
export default Eventos

const fetchData = async () => {
    const storyblokApi = getStoryblokApi()

    let sbParams: ISbStoriesParams = {
        version: 'draft',
        starts_with: "events/",
        excluding_fields: 'body,_editable,_uid',
        sort_by: "created_at:desc"
    };
    return await storyblokApi.get(`cdn/stories`, sbParams);
}