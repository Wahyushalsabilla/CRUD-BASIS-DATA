import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Clock, ArrowLeft } from 'lucide-react'
import Link from "next/link"

export default function AuctionDetail({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Link 
          href="/"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Kembali
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Section */}
          <div>
            <Card className="overflow-hidden">
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Kinder_Joy_packaging.jpg/375px-Kinder_Joy_packaging.jpg"
                alt="Kinder Joy"
                width={800}
                height={600}
                className="w-full h-[500px] object-cover"
                priority
              />
            </Card>
          </div>

          {/* Auction Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-4">Kinder Joy</h1>
              <p className="text-lg text-gray-600 mb-6">
                Kinder Joy adalah cokelat berbentuk telur dengan kombinasi sempurna antara rasa manis cokelat susu dan kejutan seru di dalamnya.
              </p>
              <div className="flex items-center gap-2 text-gray-500 mb-8">
                <Clock className="h-5 w-5" />
                <span>Lelang berakhir dalam 2 jam 30 menit</span>
              </div>
            </div>

            <Card>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Informasi Lelang</h2>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Harga Awal</p>
                        <p className="font-semibold text-gray-900">Rp. 13,000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Bid Tertinggi</p>
                        <p className="font-semibold text-gray-900">Rp. 15,000</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Total Bid</p>
                        <p className="font-semibold text-gray-900">8 bid</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Kelipatan Bid</p>
                        <p className="font-semibold text-gray-900">Rp. 1,000</p>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="font-semibold text-gray-900">Masukkan Bid Anda</h3>
                    <div className="flex gap-4">
                      <Input
                        type="number"
                        placeholder="Masukkan jumlah bid"
                        className="text-lg"
                        min={16000}
                        step={1000}
                      />
                      <Button className="bg-black text-white hover:bg-gray-800 px-8">
                        Bid
                      </Button>
                    </div>
                    <p className="text-sm text-gray-500">
                      *Minimal bid Rp. 16,000 (Bid tertinggi + Kelipatan)
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Bid History */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Riwayat Bid</h2>
                <div className="space-y-4">
                  {[
                    { user: "John Doe", amount: 15000, time: "5 menit yang lalu" },
                    { user: "Jane Smith", amount: 14000, time: "10 menit yang lalu" },
                    { user: "Mike Johnson", amount: 13000, time: "15 menit yang lalu" },
                  ].map((bid, index) => (
                    <div key={index} className="flex items-center justify-between py-2 border-b last:border-0">
                      <div>
                        <p className="font-medium text-gray-900">{bid.user}</p>
                        <p className="text-sm text-gray-500">{bid.time}</p>
                      </div>
                      <p className="font-semibold text-gray-900">
                        Rp. {bid.amount.toLocaleString()}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

