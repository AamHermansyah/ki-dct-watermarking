import 'viewerjs/dist/viewer.min.css';
import './helper/console'
import { decode, encode, status, load } from './lib/watermarking';

Reflect.set(window, 'debug', true);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div class="mx-auto max-w-2xl space-y-4 py-10 px-4">
    <div class="pb-4">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-center text-blue-700">
        Keamanan Informasi
        <br />
        DCT Watermarking
      </h1>
    </div>

    <div id="tab-nav" class="grid grid-cols-2 p-2 border rounded-lg">
      <button 
        type="button" 
        class="btn-active w-full font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        Sisipkan
      </button>
      <button 
        type="button" 
        class="btn-inactive w-full font-medium rounded-lg text-sm px-5 py-2.5 focus:outline-none"
      >
        Ekstraksi
      </button>
    </div>

    <form id="form-embed" class="space-y-4">
      <div class="w-full flex flex-col gap-1">
        <label for="input" class="block text-sm font-medium text-gray-900">
          Pilih Gambar
        </label>
        <input 
          id="input" 
          type="file" 
          accept="image/gif, image/png, image/jpg, image/jpeg, image/svg" 
          class="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
          required=""
        />
        <p class="text-xs text-gray-700" id="file_input_help">
          SVG, PNG, JPG or GIF.
        </p>
      </div>

      <div id="embed-preview" class="w-full flex flex-col gap-1 hidden">
        <p class="block text-sm font-medium text-gray-900">
          Preview
        </p>
        <div class="relative aspect-[4/3] sm:aspect-video border rounded-lg overflow-hidden">
          <img class="w-full h-full object-contain" />
        </div>
      </div>

      <div class="w-full flex flex-col gap-1">
        <label for="watermark" class="block text-sm font-medium text-gray-900">
          Teks Watermark
        </label>
        <input 
          id="watermark" 
          type="text" 
          maxlength="20" 
          placeholder="Masukan teks watermark"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
          required=""
        />
      </div>

      <div>
        <button 
          id="embed-btn"
          type="submit" 
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Sisipkan Watermark
        </button>
      </div>

      <div>
        <p class="text-sm mb-1 font-medium text-gray-900">Hasil Penyisipan Watermark</p>
        <div id="encode_result" class="relative aspect-[4/3] sm:aspect-video border rounded-lg overflow-hidden">
          <img class="w-full h-full object-contain" />
          <a 
            id="download-link" 
            href="" 
            class="hidden px-4 py-2 text-sm text-white absolute bottom-3 right-3 bg-blue-700 rounded-full hover:bg-blue-800"
            download="embed-image.jpg"
          >
            Download
          </a>
        </div>
      </div>
    </form>

    <form id="form-extract" class="space-y-4 hidden">
      <div class="w-full flex flex-col gap-1">
        <label for="input-extract" class="block text-sm font-medium text-gray-900">
          Pilih Gambar
        </label>
        <input 
          id="input-extract" 
          type="file" 
          accept="image/gif, image/png, image/jpg, image/jpeg, image/svg" 
          class="block p-2 w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none" 
          required=""
        />
        <p class="text-xs text-gray-700" id="file_input_help">
          SVG, PNG, JPG or GIF.
        </p>
      </div>

      <div id="extract-preview" class="w-full flex flex-col gap-1 hidden">
        <p class="block text-sm font-medium text-gray-900">
          Preview
        </p>
        <div class="relative aspect-[4/3] sm:aspect-video border rounded-lg overflow-hidden">
          <img class="w-full h-full object-contain" />
        </div>
      </div>

      <div>
        <button 
          id="extract-btn"
          type="submit" 
          class="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none"
        >
          Extract Watermark
        </button>
      </div>

      <div>
        <p class="text-sm mb-1 font-medium text-gray-900">Hasil Ekstraksi Watermark</p>
        <div id="decode_result" class="aspect-[4/3] sm:aspect-video border rounded-lg overflow-hidden">
          <img class="w-full h-full object-contain" />
        </div>
      </div>
    </form>
  </div>
  <div id="team" class="fixed bottom-2 left-2 text-xs bg-background/50 backdrop-blur-sm border py-2 px-3 rounded-sm transition-all duration-500 ease-in-out">
    <h4 class="font-semibold">MK. Keamanan Informasi</h4>
    <p>Our teams:</p>
    <ul class="list-decimal list-inside">
      <li>Aam Hermansyah</li>
      <li>Gia Dwi Nur Anugrah</li>
      <li>Nadhilah Hazrati</li>
    </ul>
    <button
      type="button"
      id="team-close-btn"
      class="absolute top-[50%] -translate-y-[50%] right-0 translate-x-[50%] p-1.5 border bg-white hover:bg-muted active:scale-95 rounded-sm transition-all"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlnsXlink="http://www.w3.org/1999/xlink"
        width="15px"
        height="15px"
        viewBox="0 0 32 32"
        version="1.1"
      >
        <g
          id="Page-1"
          stroke="none"
          strokeWidth={1}
          fill="none"
          fillRule="evenodd"
        >
          <g
            id="Icon-Set"
            transform="translate(-256.000000, -983.000000)"
            fill="#000000"
          >
            <path
              d="M286,1011 C286,1012.1 285.104,1013 284,1013 L260,1013 C258.896,1013 258,1012.1 258,1011 L258,987 C258,985.896 258.896,985 260,985 L284,985 C285.104,985 286,985.896 286,987 L286,1011 L286,1011 Z M284,983 L260,983 C257.791,983 256,984.791 256,987 L256,1011 C256,1013.21 257.791,1015 260,1015 L284,1015 C286.209,1015 288,1013.21 288,1011 L288,987 C288,984.791 286.209,983 284,983 L284,983 Z M267.744,989.313 C267.35,988.921 266.71,988.921 266.315,989.313 C265.92,989.707 265.92,990.344 266.315,990.736 L274.624,999.016 L266.315,1007.29 C265.92,1007.69 265.92,1008.33 266.315,1008.72 C266.71,1009.11 267.35,1009.11 267.744,1008.72 L276.716,999.777 C276.927,999.568 277.017,999.29 277.002,999.016 C277.017,998.741 276.927,998.464 276.716,998.254 L267.744,989.313 L267.744,989.313 Z"
              id="chevron-right-square"
            ></path>
          </g>
        </g>
      </svg>
    </button>
  </div>
`;

(async () => {
  console.log('load opencv');
  try {
    await load();
    console.log('load opencv success');
  } catch (e) {
    console.error(e);
    console.log('load opencv error');
  }
})();

// Tab Navigation logic
const tabBtns = document.querySelectorAll('#tab-nav button');
const forms = document.querySelectorAll('form');

tabBtns.forEach((btn, index) => {
  btn.addEventListener('click', () => {
    const isEmbedEIndex = index === 0;

    if (btn.classList.contains('btn-inactive')) {
      btn.classList.add('btn-active');
      btn.classList.remove('btn-inactive');
      tabBtns[isEmbedEIndex ? 1 : 0].classList.remove('btn-active');
      tabBtns[isEmbedEIndex ? 1 : 0].classList.add('btn-inactive');

      if (isEmbedEIndex) {
        forms[0].classList.remove('hidden');
        forms[1].classList.add('hidden');
      } else {
        forms[1].classList.remove('hidden');
        forms[0].classList.add('hidden');
      }
    }
  });
});

// Form Embed logic
const embedBtn = document.getElementById('embed-btn') as HTMLButtonElement;
const formEnbed = document.getElementById('form-embed') as HTMLFormElement;

embedBtn.addEventListener('click', async (e) => {
  if (formEnbed.checkValidity()) {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('#input');
    if (input) {
      const file = input.files![0];

      if (file) {
        console.log('file name', file.name);
        console.log('file size', file.size);
        if (!status.loaded && !status.loading) {
          return;
        };
        if (status.loading) return console.log('opencv is loading...');

        const watermarkEl = document.getElementById('watermark') as HTMLInputElement;
        const downloadLink = document.getElementById('download-link') as HTMLLinkElement;

        console.log('start add watermark to file');
        console.time('encode');
        const url = await encode(file, watermarkEl.value || 'watermark');
        console.timeEnd('encode')
        console.log('add watermark to file success');

        const encodeResultImage = document.querySelector('#encode_result img') as HTMLImageElement;
        encodeResultImage.src = url;

        downloadLink.href = url;
        downloadLink.classList.remove('hidden');
        downloadLink.classList.add('block');
      }
    }
  }
});

// Form Extract logic
const extractBtn = document.getElementById('extract-btn') as HTMLButtonElement;
const formExtract = document.getElementById('form-extract') as HTMLFormElement;

extractBtn.addEventListener('click', async (e) => {
  if (formExtract.checkValidity()) {
    e.preventDefault();
    const input = document.querySelector<HTMLInputElement>('#input-extract');

    if (input) {
      const file = input.files![0];

      const url = URL.createObjectURL(file);

      const fetchResult = await fetch(url);
      const arrayBuffer = await fetchResult.arrayBuffer();
      console.time('decode')
      const decodeResult = await decode(arrayBuffer);
      console.timeEnd('decode')
      const decodeResultImage = document.querySelector('#decode_result img') as HTMLImageElement;
      decodeResultImage.src = decodeResult;
    }
  }
});

// Team Close Button
const teamCloseBtn = document.getElementById('team-close-btn') as HTMLButtonElement;

teamCloseBtn.addEventListener('click', () => {
  document.getElementById('team')?.classList.toggle('team-translate');
});

// Embed - Image Preview
const inputEmbed = document.getElementById('input') as HTMLInputElement;
const embedPreviewWrapper = document.getElementById('embed-preview') as HTMLDivElement;
const embedPreviewImg = document.querySelector('#embed-preview img') as HTMLImageElement;

inputEmbed.onchange = function () {
  if (inputEmbed.files) {
    embedPreviewWrapper.classList.remove('hidden');
    embedPreviewImg.src = URL.createObjectURL(inputEmbed.files[0]);
  }
}

// Extract - Image Preview
const inputExtract = document.getElementById('input-extract') as HTMLInputElement;
const extractPreviewWrapper = document.getElementById('extract-preview') as HTMLDivElement;
const extractPreviewImg = document.querySelector('#extract-preview img') as HTMLImageElement;

inputExtract.onchange = function () {
  if (inputExtract.files) {
    extractPreviewWrapper.classList.remove('hidden');
    extractPreviewImg.src = URL.createObjectURL(inputExtract.files[0]);
  }
}