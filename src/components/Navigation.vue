<template>
    <aside>
        <nav>
            <ul>
                <li><router-link class="link" to="/">Home</router-link></li>
                <li><router-link class="link" to="/test-use-query">Use query playground</router-link></li>
            </ul>
        </nav>
    </aside>
</template>

<style scoped>
    aside {
        height: fit-content;
    }
    ul{
        display: flex;
        flex-direction: column;
        gap: var(--spacing-m);
    }
    .link{
        display:block;
        padding: .25rem;
        font-size: var(--font-size-l);
    }
    .link:hover{
        color: var(--color-interactive);
        font-weight: bold;
    }
</style>
        