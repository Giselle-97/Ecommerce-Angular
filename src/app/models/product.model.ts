export interface Product {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
}

export interface CreateProductDTO extends Omit<Product, "id"> {
	id: string;
	title: string;
	price: number;
	image: string;
	description: string;
	category: string;
}
