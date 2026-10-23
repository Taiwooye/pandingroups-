import Link from "next/link";
import { ApiDamageCharge, ApiPolicy } from "@/types";

// Card order and title colour per policy type
const POLICY_CARDS: { type: string; titleColor: string }[] = [
  { type: "cancellation", titleColor: "text-primary" },
  { type: "refund", titleColor: "text-gold-dark" },
  { type: "damage", titleColor: "text-slate-700" },
];

const DAMAGE_EXAMPLE_COUNT = 2;

interface PolicyCardsProps {
  policies: ApiPolicy[];
  damageCharges: ApiDamageCharge[];
  cardClassName?: string;
}

export default function PolicyCards({ policies, damageCharges, cardClassName = "bg-white" }: PolicyCardsProps) {
  const cards = POLICY_CARDS.map((c) => ({ ...c, policy: policies.find((p) => p.type === c.type) })).filter(
    (c) => c.policy
  );

  if (cards.length === 0) {
    return (
      <p className="text-xs text-slate-500 leading-relaxed">
        Please review our{" "}
        <Link href="/policies" className="text-primary underline hover:no-underline">
          Guest Policies
        </Link>{" "}
        for cancellation, refund, and damage terms.
      </p>
    );
  }

  const damageExamples = [...damageCharges]
    .sort((a, b) => a.sort_order - b.sort_order)
    .slice(0, DAMAGE_EXAMPLE_COUNT)
    .map((c) => `${c.item.toLowerCase()} ₦${parseFloat(c.charge).toLocaleString()}`)
    .join(", ");

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {cards.map(({ type, titleColor, policy }) => (
        <div key={type} className={`${cardClassName} rounded-xl p-4 border border-cream-dark`}>
          <p className={`font-semibold ${titleColor} text-sm mb-2`}>{policy!.title}</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            {type === "damage" ? (
              <>
                Charges apply for damages during your stay{damageExamples && ` (e.g. ${damageExamples})`}.{" "}
                <Link href="/policies" className="text-primary underline hover:no-underline">
                  View full schedule
                </Link>
                .
              </>
            ) : (
              policy!.content
            )}
          </p>
        </div>
      ))}
    </div>
  );
}
