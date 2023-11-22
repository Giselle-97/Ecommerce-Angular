export interface Product {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
	taxes?: number;
}

export interface CreateProductDTO extends Omit<Product, "id"> {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
}

export interface UpdateProductDTO {
	title?: string;
	price?: number;
	image?: string;
	description?: string;
	category?: string;
}
