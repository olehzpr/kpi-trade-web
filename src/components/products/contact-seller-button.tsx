import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import useMediaQuery from "@/hooks/utils/useMediaQuery";
import Link from "next/link";
import { User } from "@/types/user/user";
import { Phone } from "lucide-react";
import { SiInstagram, SiTelegram } from "@icons-pack/react-simple-icons";

export default function ContactSellerButton({ seller }: { seller: User }) {
  const [open, setOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="cursor-pointer">Звʼязатись з продавцем</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Контактна інформація продавця</DialogTitle>
            <DialogDescription>
              <Link href="/terms" className="text-blue-600">
                Умови користування
              </Link>
            </DialogDescription>
          </DialogHeader>
          <ContactSellerSection seller={seller} />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="cursor-pointer">Звʼязатись з продавцем</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Контактна інформація продавця</DrawerTitle>
          <DialogDescription>
            <Link href="/terms" className="text-blue-600">
              Умови користування
            </Link>
          </DialogDescription>
        </DrawerHeader>
        <div className="p-4">
          <ContactSellerSection seller={seller} />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Скасувати</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

function ContactSellerSection({ seller }: { seller: User }) {
  return (
    <div className="flex flex-col gap-4">
      {seller.phone && (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-600">Телефон</span>
          <a href={`tel:${seller.phone}`}>
            <Button className="w-full cursor-pointer">
              <Phone />
              {seller.phone}
            </Button>
          </a>
        </div>
      )}
      {seller.instagram && (
        <div className="flex flex-col gap-2">
          <span className="text-sm text-neutral-600">Instagram</span>
          <a
            href={`https://instagram.com/${seller.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button className="w-full cursor-pointer">
              <SiInstagram />
              {seller.instagram}
            </Button>
          </a>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <span className="text-sm text-neutral-600">Telegram</span>
        <a
          href={`https://t.me/${seller.telegramUsername}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="w-full cursor-pointer">
            <SiTelegram />@{seller.telegramUsername}
          </Button>
        </a>
      </div>
    </div>
  );
}
