Scopul proiectului:
ExpertEat este un sistem expert care oferă recomandări personalizate de restaurante, în funcție de preferințele utilizatorului legate de tipul de mâncare, buget și locație.
Scopul aplicației este de a simplifica procesul de alegere a unui restaurant potrivit, oferind sugestii rapide, vizuale și relevante pe baza criteriilor introduse.

Descrierea funcționalităților principale:
 1. Baza de cunoștințe
Am utilizat o bază de date relațională SQLite care conține informații despre restaurante: tipul de mâncare, buget, locații, imagini și link-uri către paginile oficiale.
Pentru restaurantele cu mai multe locații, datele sunt stocate într-un format flexibil, permițând asocierea corectă a imaginilor cu locațiile corespunzătoare.

 2. Motorul de inferență (algoritmul de recomandare)
Funcția filter_restaurants() din rules.py evaluează fiecare restaurant în funcție de preferințele introduse de utilizator.
Motorul utilizează o abordare de tip Forward Chaining, pornind de la preferințe și traversând baza de date pentru a identifica restaurantele care se potrivesc cel mai bine.
Fiecărui restaurant i se atribuie un scor în funcție de numărul de criterii îndeplinite, iar rezultatele sunt returnate într-o ordine descrescătoare a relevanței.

 3. Interfața utilizator
Aplicația web este construită cu Flask pentru backend și HTML, CSS, JavaScript pentru frontend.
Utilizatorul completează un formular cu preferințele sale, iar rezultatele sunt afișate direct în pagină, sub formă de listă ilustrată.
Fiecare restaurant este prezentat cu imagine reprezentativă, scor de potrivire și link direct către pagina oficială.


