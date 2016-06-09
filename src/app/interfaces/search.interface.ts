/**
 * Created by Murhaf on 5/26/2016.
 */
export interface Hit {
  previewHeight: number;
  likes: number;
  favorites: number;
  tags: string;
  webformatHeight: number;
  views: number;
  webformatWidth: number;
  previewWidth: number;
  comments: number;
  downloads: number;
  pageURL: string;
  previewURL: string;
  webformatURL: string;
  imageWidth: number;
  user_id: number;
  user: string;
  type: string;
  id: number;
  userImageURL: string;
  imageHeight: number;
}

export interface IResults {
  totalHits: number;
  hits: Hit[];
  total: number;
}
