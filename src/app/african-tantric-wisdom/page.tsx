import PDFViewer from "@/components/PDFViewer";

export default function AfricanTantricWisdomPage() {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-lg text-white">
        <p className="my-6">
          On this page, you will find the collective wisdom of a whole community. We focus on ancient African Tantric
          practices and research the links between such practices and more popular and widely known ones, which generally
          have their locus of practice in India.
        </p>
        <p className="mb-6">
          Giving so much thanks and praise for the honor of compiling these works so far, and being allowed to be a medium
          for bringing this Wisdom forward. We are putting out the call for our Human Family to come forward to co-create,
          and further connect the dots, to help us all remember our foundational and vital Journey into Ancient African
          Tantric Wisdom.
        </p>
        <p className="mb-6">
          If you have any relevant research or compilations that you would like to add into this collection, please send
          them via <a href="mailto:hekimawisdomwellness@proton.me" className="font-bold underline">email to us</a>.
        </p>

        <div className="max-w-4xl mx-auto px-4 py-20">
            <PDFViewer fileUrl="/wisdom/African_Tantra_Slides.pdf" />
        </div>

        <div className="max-w-4xl mx-auto px-4 py-20">
            <PDFViewer fileUrl="/wisdom/African_Tantra_Words.pdf" />
        </div>

      </div>
    );
  }
  