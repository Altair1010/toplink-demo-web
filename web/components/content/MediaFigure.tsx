import { approvedValue, type Media } from "@/types/domain";

export function MediaFigure({ media }: { media: Media }) {
  const asset = approvedValue(media.asset);
  const alt = approvedValue(media.alt_text);
  const role = approvedValue(media.media_role);
  const authorization = approvedValue(media.authorization);
  const publishability = approvedValue(media.publishability_status);

  if (!asset || alt === undefined || !role || !authorization || !publishability) return null;

  const caption = approvedValue(media.caption);

  return (
    <figure className="media-figure" data-media-role={role}>
      {/* CMS media is provenance-gated and may be remote; P6 owns URL normalization. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={asset.src} width={asset.width} height={asset.height} alt={alt} />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
