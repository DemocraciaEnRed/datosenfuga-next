import { ISbStoriesParams, getStoryblokApi } from "@storyblok/react/rsc";
import EventsMasonry from "./components/EventsMasonry";
import { Metadata } from "next";

const metaTitle = 'Blog'
const metaDescription = 'Blog de Datos en Fuga'

export const metadata: Metadata = {
  title: metaTitle,
  description: metaDescription,
  keywords: 'blog, debate, presentaciones, seguridad informática, ciberseguridad, justicia',
  openGraph: {
    title: metaTitle,
    description: metaDescription
  }
}

const Eventos = async () => {
    const { data } = await fetchData();
    return (
        <main className="bg-[#F1F1F1] flex flex-col flex-grow">
            <header className='font-kanit bg-[#2D2D2D] py-[4vw] px-8 sm:px-[65px] md:px-[130px]'>
                <h1 className=' text-3xl sm:text-4xl mb-4 font-bold'>
                    BLOG
                </h1>
                <p className='text-3xl sm:text-4xl'>
                    Artículos y eventos relacionados al proyecto.
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
        version: 'published',
        starts_with: "events/",
        excluding_fields: 'body,_editable,_uid',
        sort_by: "created_at:desc"
    };
    return await storyblokApi.get(`cdn/stories`, sbParams);
}