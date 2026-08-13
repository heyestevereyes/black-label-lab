/**
 * Un elemento de la galería del detalle de proyecto.
 *
 * `aspectRatio` solo aplica a `type: "video"`: define el padding-top del
 * contenedor que reserva la proporción del iframe (por ejemplo "56.25%"
 * para 16:9, "75%" para 4:3). Si se omite en un video se usa 16:9.
 * En `type: "image"` se ignora — las imágenes conservan su proporción
 * natural al escalar a ancho completo.
 */
export interface GalleryItem {
  type: "image" | "video";
  src: string;
  aspectRatio?: string;
}

/** Proporción por defecto de los videos: 16:9. */
export const DEFAULT_VIDEO_ASPECT_RATIO = "56.25%";

/**
 * Forma de un proyecto. Tipar el catálogo con esta interface hace que
 * TypeScript valide cualquier proyecto que se agregue en el futuro.
 */
export interface Project {
  /** Segmento de URL — resuelve a /proyectos/[slug] */
  slug: string;
  /** Nombre del proyecto */
  name: string;
  /** Categorías; se renderizan como pills en el detalle */
  tags: string[];
  /** Texto de introducción del detalle */
  description: string;
  /** Imagen principal del detalle */
  mainImage: string;
  /**
   * Portada de la tarjeta en la grilla. Si se omite se usa mainImage,
   * que es lo que hacían todos los proyectos antes de que Kapital
   * necesitara una portada distinta a su imagen principal.
   */
  cardImage?: string;
  /** Contenido de la galería: imágenes y/o videos, en orden. */
  galleryItems: GalleryItem[];

  /**
   * Campos exclusivos de la tarjeta en la grilla, tomados de Figma.
   * No forman parte de la forma pedida para el detalle, pero se conservan
   * porque quitarlos regresaría el diseño ya aprobado de ProjectsSection.
   */
  /** Fondo CSS opcional detrás del arte (color o degradado). */
  backgroundStyle?: string;
  /** Velo negro sobre el arte para que el título encima siga legible. 0 = sin velo. */
  overlayOpacity?: number;
}
