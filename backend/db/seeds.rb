# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

nutritionists = [
    {
        name: "João da Silva",
        email: "joao@gmail.com",
        website: "joao.com"
    },
    {
        name: "Maria Oliveira",
        email: "maria@gmail.com",
        website: "maria.com"
    },
    {
        name: "Pedro Santos",
        email: "pedro@gmail.com",
        website: "pedro.com"
    }
]

locations = [
    {
        address: "Rua da Praia, 123",
        municipality: "Portimão",
        district: "Faro",
        zipcode: "123456"
    },
    {
        address: "Rua do Sobrado, 123",
        municipality: "Vila Verde",
        district: "Braga",
        zipcode: "123456"
    },
    {
        address: "Rua da Bairro, 123",
        municipality: "Barreiro",
        district: "Lisboa",
        zipcode: "123456"
    }
]

services = [
    {
        name: "Perda de peso",
        price: 100,
        nutritionist: "João da Silva",
        location: "Rua da Praia, 123"
    },
    {
        name: "Gestão de peso",
        price: 150,
        nutritionist: "João da Silva",
        location: "Rua do Sobrado, 123"
    },
    {
        name: "Nutrição Desportiva",
        price: 200,
        nutritionist: "Maria Oliveira",
        location: "Rua da Praia, 123"
    },
    {
        name: "Complementos Dietéticos",
        price: 300,
        nutritionist: "Maria Oliveira",
        location: "Rua da Bairro, 123"
    },
    {
        name: "Nutrição para crianças",
        price: 122.50,
        nutritionist: "Pedro Santos",
        location: "Rua da Praia, 123"
    },
    {
        name: "Nutrição para idosos",
        price: 144.50,
        nutritionist: "Pedro Santos",
        location: "Rua do Sobrado, 123"
    }


]

guests = [
    {
        name: "Emilia Pereira",
        email: "emilia@gmail.com",
        appointment_date: "2025-07-27 10:00:00",
        client_to_nutritionist: "João da Silva",
        service: "Perda de peso"
    },
    {
        name: "Paulo Proença",
        email: "paulo@gmail.com",
        appointment_date: "2025-07-28 10:00:00",
        client_to_nutritionist: "João da Silva",
        service: "Gestão de peso"
    },
    { name: "Carlos Costa",
        email: "carlos@gmail.com",
        appointment_date: "2025-07-27 10:00:00",
        client_to_nutritionist: "Maria Oliveira",
        service: "Nutrição Desportiva"
    },
    {
        name: "Ana Ribeiro",
        email: "ana@gmail.com",
        appointment_date: "2025-07-28 10:00:00",
        client_to_nutritionist: "Pedro Santos",
        service: "Complementos Dietéticos"
    }
]

Appointment.delete_all
Service.delete_all
Nutritionist.delete_all
Location.delete_all


nutritionists.each do |nutritionist|
    Nutritionist.create!(nutritionist)
end

locations.each do |location|
    Location.create!(location)
end

services.each do |service|
    Service.create!(
        name: service[:name],
        price: service[:price],
        nutritionist_id: Nutritionist.find_by(name: service[:nutritionist]).id,
        location_id: Location.find_by(address: service[:location]).id
    )
end

guests.each do |guest|
    Appointment.create!(
        guest_name: guest[:name], 
        guest_email: guest[:email],
        datetime: guest[:appointment_date],
        service_id: Service.find_by(name: guest[:service]).id,
        nutritionist_id: Nutritionist.find_by(name: guest[:client_to_nutritionist]).id)
end