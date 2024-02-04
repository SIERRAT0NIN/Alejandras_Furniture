import React from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Image,
  Button,
} from "@nextui-org/react";

export default function FeaturedTop() {
  return (
    <div className="flex justify-center mt-5 p-3">
      <Card>
        <div className="max-w-[900px] gap-2 grid grid-cols-12 grid-rows-2 px-8">
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black/60 uppercase font-bold">
                Warm and welcoming
              </p>
              <h4 className="text-black font-medium text-large">SHERISE</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://www.foagroup.com/media/catalog/product/cache/1/image/9df78eab33525d08d6e5fb8d27136e95/c/m/cm7476gy-q-1-0.jpg"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black/60 uppercase font-bold">
                CIVELLUTINO
              </p>
              <h4 className="text-black font-medium text-large">
                Upscale yet serene
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://www.foagroup.com/media/catalog/product/cache/1/image/700x700/17f82f742ffe127f42dca9de82fb58b1/f/m/fm90004-lv-1-0.jpg"
            />
          </Card>
          <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 top-1 flex-col !items-start">
              <p className="text-tiny text-black/60 uppercase font-bold">
                LYCORIDA
              </p>
              <h4 className=" font-medium text-large">
                Smooth and feature some flair with sleek, chrome pulls.
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card background"
              className="z-0 w-full h-full object-cover"
              src="https://www.foagroup.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/c/m/cm7477gy-m-1-0.jpg"
            />
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-5"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white/60 uppercase font-bold">New</p>
              <h4 className="text-black font-medium text-2xl">CIVELLUTINO</h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Card example background"
              className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
              src="https://www.foagroup.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/s/m/sm5172-ot-1.jpg"
            />
            <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
              <div>
                <p className="text-black text-tiny">Available soon.</p>
                <p className="text-black text-tiny">Get notified.</p>
              </div>
              <Button
                className="text-tiny"
                color="primary"
                radius="full"
                size="sm"
              >
                Notify Me
              </Button>
            </CardFooter>
          </Card>
          <Card
            isFooterBlurred
            className="w-full h-[300px] col-span-12 sm:col-span-7"
          >
            <CardHeader className="absolute z-10 top-1 flex-col items-start">
              <p className="text-tiny text-white  uppercase font-bold">
                SHONDA
              </p>
              <h4 className="text-white/90 font-medium text-xl">
                With black cushions and wicker frames, the contemporary vibes
              </h4>
            </CardHeader>
            <Image
              removeWrapper
              alt="Relaxing app background"
              className="z-0 w-full h-full object-cover"
              src="https://www.foagroup.com/media/catalog/product/cache/1/image/040ec09b1e35df139433887a97daa66f/f/m/fm80001bb-set_2ch-1.jpg"
            />
            <CardFooter className="absolute bg-black/40 bottom-0 z-10 border-t-1 border-default-600 dark:border-default-100">
              <div className="flex flex-grow gap-2 items-center">
                <Image
                  alt="Breathing app icon"
                  className="rounded-full w-10 h-11 bg-black"
                  src="/images/breathing-app-icon.jpeg"
                />
                <div className="flex flex-col">
                  <p className="text-tiny text-white/60">Outdoor Furniture</p>
                  <p className="text-tiny text-white/60">
                    Enjoy the great outdoors.
                  </p>
                </div>
              </div>
              <Button radius="full" size="sm">
                Explore
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Card>
    </div>
  );
}
