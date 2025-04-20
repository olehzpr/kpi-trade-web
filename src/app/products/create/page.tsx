import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { Switch } from "@/components/ui/switch";

export default function CreateProductPage() {
  return (
    <form className="flex flex-col gap-4 p-4 w-full mb-6">
      <h2 className="text-2xl font-bold mb-3 sm:hidden">
        Створити нове оголошення
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md h-fit">
          <Label className="text-sm" htmlFor="product-title-input">
            Зображення
          </Label>
          <div className="aspect-square flex items-center justify-center bg-neutral-100 rounded-lg border-dashed border-2">
            <p className="text-gray-500">Завантажити зображення</p>
          </div>
        </div>
        <div className="flex flex-col gap-4 sm:col-span-2">
          <h2 className="text-2xl font-bold mb-3 hidden sm:block">
            Створити нове оголошення
          </h2>
          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="product-title-input">
              Назва оголошення
            </Label>
            <Input
              id="product-title-input"
              placeholder="Головна назва"
              className="border-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="product-description-input">
              Опис товару
            </Label>
            <Textarea
              id="product-description-input"
              placeholder="Детальніше про товар..."
              className="border-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="product-price-input">
              Категорія (визначається автоматично)
            </Label>
            <Input
              id="product-price-input"
              disabled
              placeholder="Електроніка"
              className="border-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm" htmlFor="product-price-input">
              Ціна товару
            </Label>
            <Input
              id="product-price-input"
              placeholder="Ціна товару в грн"
              className="border-none"
            />
          </div>
          <div className="flex flex-col gap-2 w-full bg-brand-100 p-2 rounded-md">
            <Label className="text-sm">Дозволи на персональні контакти</Label>
            <div className="flex gap-2 items-center text-sm">
              <Switch />
              Номер телефону
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Switch />
              Instagram
            </div>
            <div className="flex gap-2 items-center text-sm">
              <Switch checked={true} disabled />
              Telegram
            </div>
          </div>
          <Button>Створити оголошення</Button>
        </div>
      </div>
    </form>
  );
}
